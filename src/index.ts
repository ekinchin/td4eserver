/* eslint-disable import/extensions */
/* eslint-disable no-console */
import createServer from './server';
import api from './api';
import WebController from './controllers/WebController';

console.log('Running...');
createServer(WebController(api));
