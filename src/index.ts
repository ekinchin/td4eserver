/* eslint-disable import/extensions */
/* eslint-disable no-console */
import Storage from './storage';
import { UsersClass } from './entities/users';
import { SessionsClass } from './entities/sessions';
// eslint-disable-next-line no-unused-vars
import type { TUser, TSession } from './types';
import createServer from './server';
import createApi from './api';
import createWebController from './controllers/WebController';

const usersDatabase = new Storage<TUser>('User');
const Users = new UsersClass(usersDatabase);

const sessionsDatabase = new Storage<TSession>('Session');
const Sessions = new SessionsClass(sessionsDatabase);

const api = createApi(Sessions, Users);
const WebController = createWebController(api, Sessions);
// eslint-disable-next-line no-unused-vars
const webServer = createServer(WebController);
