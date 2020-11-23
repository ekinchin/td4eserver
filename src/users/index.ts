/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { userType } from '../types';
import Storage from '../storage';
// eslint-disable-next-line no-unused-vars
import { IStorage } from '../interfaces/storage';

class UsersClass {
  DB: IStorage;

  constructor(database: IStorage) {
    this.DB = database;
  }

  async find(username: string): Promise<userType> {
    return JSON.parse(await this.DB.read('username', username)) || Promise.reject(Error('User not found'));
  }

  async add(
    username: string,
    password: string,
  ): Promise<userType> {
    const user: userType = {
      username, password, permissions: { allow: [''], deny: [''] },
    };
    await this.DB.create(JSON.stringify(user));
    return user;
  }

  // async delete(username: string): Promise<userType> {
  //   return this.find(username).then((user) => {
  //     delete this.DB[username];
  //     return user;
  //   });
  // }

  // async update(
  //   oldUsername: string,
  //   username?: string,
  //   password?: string,
  //   permissions?: Array<string>,
  // ): Promise<userType> {
  //   return this.find(oldUsername)
  //     .then((user) => this.delete(user.username))
  //     .then((user) => this.add(
  //       username || user.username,
  //       password || user.password,
  //       permissions || user.permissions,
  //     ));
  // }
}

const database = new Storage('user');
const Users = new UsersClass(database);

export default Users;
