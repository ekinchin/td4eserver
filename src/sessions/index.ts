/* eslint-disable import/extensions */
import Storage from '../storage';
// eslint-disable-next-line no-unused-vars
import type { IStorage } from '../interfaces/storage';
// eslint-disable-next-line no-unused-vars
import type { ISessions } from '../interfaces/sessions';
// eslint-disable-next-line no-unused-vars
import type { TSession, TError } from '../types';

class SessionsClass implements ISessions {
  storage: IStorage<TSession>;

  constructor(database: IStorage<TSession>) {
    this.storage = database;
  }

  // eslint-disable-next-line no-unused-vars
  async find(id: string): Promise<{result?: Array<TSession>, error?: TError}> {
    const { result, error } = await this.storage.read('id', id);
    return result ? { result } : { error };
  }

  async add(username: string): Promise<{result?: TSession, error?: TError}> {
    const document = JSON.stringify({ username });
    const { result, error } = await this.storage.create(document);
    return { result, error };
  }

  async delete(id: string): Promise<{result?: TSession, error?: TError}> {
    const { result, error } = await this.storage.delete('id', id);
    return { result, error };
  }
}

// const database = new Storage();
const database = new Storage<TSession>('Session');
const Sessions = new SessionsClass(database);

export default Sessions;
