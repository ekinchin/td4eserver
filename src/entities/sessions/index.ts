/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { IStorage } from '../../interfaces/storage';
// eslint-disable-next-line no-unused-vars
import type { ISessions } from '../../interfaces/sessions';
// eslint-disable-next-line no-unused-vars
import type { TSession, TError } from '../../types';

class SessionsClass implements ISessions {
  storage: IStorage<TSession>;

  constructor(database: IStorage<TSession>) {
    this.storage = database;
  }

  // eslint-disable-next-line no-unused-vars
  async find(id: string): Promise<{result?: Array<TSession>, error?: TError}> {
    const { result, error } = await this.storage.read('_id', id);
    return result ? { result } : { error };
  }

  async add(userId: string): Promise<{result?: TSession, error?: TError}> {
    const dateOfExpiry = Date.now() + 3600000;
    console.log({ userId, dateOfExpiry });
    const document = JSON.stringify({ userId, dateOfExpiry });
    const { result, error } = await this.storage.create(document);
    return { result, error };
  }

  async delete(id: string): Promise<{result?: TSession, error?: TError}> {
    const { result, error } = await this.storage.delete('id', id);
    return { result, error };
  }
}

// eslint-disable-next-line import/prefer-default-export
export { SessionsClass };
