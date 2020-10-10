/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
// import storage from '../storage';

export type userType = {
  username: string,
  password: string,
  permissions: Array<string>
}

type userDBType = {[index: string]: userType};

const userDB: userDBType = {};

class UsersClass {
  DB : userDBType

  constructor(database: userDBType) { this.DB = database; }

  async find(username: string) : Promise<userType> { return this.DB[username] || Promise.reject(Error('User not found')); }

  async add(username: string, password: string, permissions: Array<string>) : Promise<userType> {
    if (!this.DB[username]) {
      this.DB[username] = { username, password, permissions };
      return this.find(username);
    }
    throw new Error('User already exists');
  }

  async delete(username: string) : Promise<userType> {
    return this.find(username)
      .then((user) => {
        delete this.DB[username];
        return user;
      });
  }

  async update(
    oldUsername: string,
    username?: string,
    password?: string,
    permissions?: Array<string>,
  ) : Promise<userType> {
    return this.find(oldUsername)
      .then((user) => this.delete(user.username))
      .then((user) => this.add(
        username || user.username,
        password || user.password,
        permissions || user.permissions,
      ));
  }
}

const Users = new UsersClass(userDB);

export default Users;
