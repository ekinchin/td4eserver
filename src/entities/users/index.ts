/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { TUser, TError } from '../../types';
// eslint-disable-next-line no-unused-vars
import { IStorage } from '../../interfaces/storage';
// eslint-disable-next-line no-unused-vars
import { IUser } from '../../interfaces/users';

class UsersClass implements IUser {
  storage: IStorage<TUser>;

  constructor(database: IStorage<TUser>) {
    this.storage = database;
  }

  async find(field: string, value: string): Promise<{result?: Array<TUser>, error?: TError}> {
    const { result, error } = await this.storage.read(field, value);
    return { result, error };
  }

  async add(username: string, password: string): Promise<{result?: TUser, error?: TError}> {
    const user: TUser = {
      id: '', username, password, permissions: { allow: [''], deny: [''] },
    };
    const { result, error } = await this.storage.create(JSON.stringify(user));
    return { result, error };
  }

  async delete(username: string): Promise<{result?: TUser, error?: TError}> {
    const existUsers: {result?: Array<TUser>, error?: TError} = await this.find('username', username);
    if (existUsers) {
      const { result, error } = await this.storage.delete('username', username);
      return { result, error };
    }
    const error :TError = { message: 'user not exists', code: 1 };
    return { error };
  }
}

// eslint-disable-next-line import/prefer-default-export
export { UsersClass };
