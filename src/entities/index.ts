/* eslint-disable import/extensions */
import Storage from '../storage';
import { UsersClass } from './users';
import { SessionsClass } from './sessions';
// eslint-disable-next-line no-unused-vars
import type { TUser, TSession } from '../types';

const usersDatabase = new Storage<TUser>('User');
const sessionsDatabase = new Storage<TSession>('Session');

const Users = new UsersClass(usersDatabase);
const Sessions = new SessionsClass(sessionsDatabase);

export { Users, Sessions };
