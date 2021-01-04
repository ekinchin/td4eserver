/* eslint-disable import/extensions */
/* eslint-disable no-console */
import createServer from './server';
import api from './api';

console.log('Running...');
createServer(api);
