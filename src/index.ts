/* eslint-disable import/extensions */
/* eslint-disable no-console */
import Storage from './storage';
import { UsersClass } from './entities/users';
import { SessionsClass } from './entities/sessions';
import { NotesClass } from './entities/notes';
// eslint-disable-next-line no-unused-vars
import type { TUser, TSession, TNote } from './types';
import createServer from './server';
import createApi from './api';
import createWebController from './controllers/WebController';

const usersDatabase = new Storage<TUser>('User');
const Users = new UsersClass(usersDatabase);

const sessionsDatabase = new Storage<TSession>('Session');
const Sessions = new SessionsClass(sessionsDatabase);

const notesDatabase = new Storage<TNote>('Note');
const Notes = new NotesClass(notesDatabase);

const api = createApi(Sessions, Users, Notes);
const WebController = createWebController(api, Sessions, Users);
// eslint-disable-next-line no-unused-vars
const webServer = createServer(WebController);
