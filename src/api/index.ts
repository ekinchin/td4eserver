/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/extensions */
import fs from 'fs';
import Sessions from '../sessions';
// eslint-disable-next-line no-unused-vars
import type { TSession, TRequestData, TResponseData } from '../types';

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

const routing = async (request: TRequestData): Promise<TResponseData> => {
  const { session, endpoint } = request;
  // определение наличия валидной сессии
  const sessionIsValid: boolean = session ? await checkSession(session) : false;
  let validEndpoint: string = '';
  if (!sessionIsValid && endpoint !== '/api/register' && endpoint !== '/api/auth' && endpoint !== '/api/userlist') {
    validEndpoint = '/api/unauthorization';
  } else {
    // eslint-disable-next-line no-prototype-builtins
    validEndpoint = api.hasOwnProperty(endpoint) ? endpoint : '/api/notfound';
  }
  return api[validEndpoint](request);
};

export default routing;
