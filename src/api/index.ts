/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import fs from 'fs';
// eslint-disable-next-line no-unused-vars
import Sessions, { sessionType } from '../sessions';

const API_DIR = './build/api/endpoints';

type apiType = {[index: string]: any};

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

const checkSession = async (id: string)
  : Promise<boolean> => Sessions.find(id)
  .then((session: sessionType) => {
    if (Date.now() > session.dateOfExpiry) {
      Sessions.delete(id);
      return false;
    }
    return true;
  })
  .catch(() => false);

const api:apiType = apiLoad();

const routing = async (request: any, response: any, data: any): Promise<any> => {
  const { url, headers } = request;
  const { session } = headers;
  // определение наличия валидной сессии
  const sessionIsValid: boolean = await checkSession(session);
  let endpoint: string = '';
  if (!sessionIsValid && url !== '/api/register' && url !== '/api/auth') {
    endpoint = '/api/unauthorization';
  } else {
    endpoint = api.hasOwnProperty(url) ? url : '/api/notfound';
  }
  return api[endpoint](request, response, data);
};

export default routing;
