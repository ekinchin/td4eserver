/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/extensions */
import fs from 'fs';
import Sessions from '../sessions';
// eslint-disable-next-line no-unused-vars
import type { TSession } from '../types';

const API_DIR = './build/api/endpoints';

type apiType = {[index: string]: any, };

const apiLoad = () => {
  const files = fs.readdirSync(API_DIR);
  const modules = files.filter((filename) => filename !== 'index.js' && filename.endsWith('.js'));
  return modules.reduce<Record<string, string>>((endpoints, file) => {
    const endpoint = `/api/${file.slice(0, -3)}`;
    const modulepath = `./endpoints/${file}`;
    // eslint-disable-next-line global-require
    const module = require(modulepath).default;
    // eslint-disable-next-line no-param-reassign
    endpoints[endpoint] = module;
    return endpoints;
  }, {});
};

const checkSession = async (id: string): Promise<boolean> => {
  const sessions = await Sessions.find(id);
  if (!sessions.result) return false;
  const session = sessions.result[0];
  return !((Date.now() > session.dateOfExpiry));
};

const api:apiType = apiLoad();

const methodError = async (request: any, response: any) => {
  response.statusCode = 400;
  response.setHeader('Content-Type', 'application/json');
  response.write(JSON.stringify({ 400: 'POST method expected' }));
  response.end();
};

const routing = async (request: any, response: any, data: any): Promise<any> => {
  const { method, url, headers } = request;
  if (method !== 'POST') return methodError(request, response);
  const { session } = headers;
  // определение наличия валидной сессии
  const sessionIsValid: boolean = await checkSession(session);
  let endpoint: string = '';
  if (!sessionIsValid && url !== '/api/register' && url !== '/api/auth' && url !== '/api/userlist') {
    endpoint = '/api/unauthorization';
  } else {
    // eslint-disable-next-line no-prototype-builtins
    endpoint = api.hasOwnProperty(url) ? url : '/api/notfound';
  }
  return api[endpoint](request, response, data);
};

export default routing;
