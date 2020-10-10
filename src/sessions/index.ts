/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
// import storage from '../storage';
import crypto from 'crypto';

export type sessionType = {
  id: string,
  username: string,
  dateOfExpiry: number,
}

type sessionDBType = {[index: string]: sessionType};

const tokenDB: sessionDBType = {};

class SessionsClass {
  DB : sessionDBType

  constructor(database: sessionDBType) { this.DB = database; }

  async find(id: string) : Promise<sessionType> {
    const token: sessionType = this.DB[id];
    if (!token) return Promise.reject(new Error('Token not found'));
    return token;
  }

  async add(username: string) : Promise<sessionType> {
    const id: string = crypto.randomBytes(16).toString('base64');
    const dateOfExpiry = Date.now() + 1000 * 60 * 60;
    this.DB[id] = { id, username, dateOfExpiry };
    return this.find(id);
  }

  async delete(id: string) : Promise<sessionType> {
    return this.find(id)
      .then((session) => {
        delete this.DB[id];
        return session;
      })
      .catch((err) => Promise.reject(err));
  }
}

const Sessions = new SessionsClass(tokenDB);

export default Sessions;
