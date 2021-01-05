/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/extensions */
import fs from 'fs';
import vm from 'vm';
import { Sessions } from '../sessions';
import { Users } from '../users';

// eslint-disable-next-line no-unused-vars
import type { TSession, TRequestData, TResponseData } from '../types';

const API_DIR = './build/api/endpoints';

type apiType = {[index: string]: any, };

const safeRequire = (module: string) => {
  const safeModule = module.startsWith('../') ? module.slice(3) : module;
  // eslint-disable-next-line global-require
  return require(safeModule);
};

const endpointsDeclaration = [
  {
    name: 'userlist',
    context: {
      require: safeRequire, JSON, console, Sessions, Users,
    },
  }, {
    name: 'auth',
    context: {
      require: safeRequire, JSON, console, Sessions, Users,
    },
  }, {
    name: 'notfound',
    context: {
      require: safeRequire, JSON, console, Sessions, Users,
    },
  }, {
    name: 'register',
    context: {
      require: safeRequire, JSON, console, Sessions, Users,
    },
  }, {
    name: 'unregister',
    context: {
      require: safeRequire, JSON, console, Sessions, Users,
    },
  }, {
    name: 'unauth',
    context: {
      require: safeRequire, JSON, console, Sessions, Users,
    },
  }, {
    name: 'unauthorization',
    context: {
      require: safeRequire, JSON, console, Sessions, Users,
    },
  },
];

const apiLoad = () => {
  const files = fs.readdirSync(API_DIR);
  const loadable = files.filter((filename) => filename !== 'index.js' && filename.endsWith('.js'));
  const existsEndpoints = endpointsDeclaration.filter((endpoint) => loadable.includes(`${endpoint.name}.js`));
  console.log('Exists enpoints: ', existsEndpoints);
  return existsEndpoints.reduce<Record<string, string>>((endpoints, endpoint) => {
    const { name, context } = endpoint;
    console.log(`loading ${name}`);
    const sandbox = vm.createContext(context);
    const source = fs.readFileSync(`${API_DIR}/${name}.js`).toString();
    const f = vm.runInContext(source, sandbox);
    // eslint-disable-next-line no-param-reassign
    endpoints[`/api/${name}`] = f;
    return endpoints;
  }, {});
};

const checkSession = async (id: string): Promise<boolean> => {
  const sessions = await Sessions.find(id);
  if (!sessions.result) return false;
  const session = sessions.result[0];
  return !((Date.now() > session.dateOfExpiry));
};

console.log('API loading...');
const api:apiType = apiLoad();
console.log('API loaded.');

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
