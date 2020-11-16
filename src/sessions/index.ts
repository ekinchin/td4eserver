/* eslint-disable import/extensions */
import crypto from 'crypto';
// eslint-disable-next-line no-unused-vars
import type { sessionDBType, sessionType } from '../types';

const tokenDB: sessionDBType = {};
class SessionsClass {
  DB: sessionDBType;

  constructor(database: sessionDBType) {
    this.DB = database;
  }

  async find(id: string): Promise<sessionType> {
    return this.DB[id] || Promise.reject(new Error('Token not found'));
  }

  async add(username: string): Promise<sessionType> {
    const id: string = crypto.randomBytes(16).toString('base64');
    const dateOfExpiry = Date.now() + 1000 * 60 * 60;
    this.DB[id] = { id, username, dateOfExpiry };
    return this.find(id);
  }

  async delete(id: string): Promise<sessionType> {
    return this.find(id).then((session) => {
      delete this.DB[id];
      return session;
    });
  }
}

const Sessions = new SessionsClass(tokenDB);

export default Sessions;
