/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/extensions */
import fs from 'fs';
import vm from 'vm';
import { Sessions, Users } from '../entities';
// eslint-disable-next-line no-unused-vars
import type { TApiMethod, TApi } from '../types';

const API_DIR = './build/api/methods';

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
  return existsEndpoints.reduce<Record<string, TApiMethod>>((endpoints, endpoint) => {
    const { name, context } = endpoint;
    console.log(`loading ${name}`);
    const sandbox = vm.createContext(context);
    const source = fs.readFileSync(`${API_DIR}/${name}.js`).toString();
    const f: TApiMethod = vm.runInContext(source, sandbox);
    // eslint-disable-next-line no-param-reassign
    endpoints[`/api/${name}`] = f;
    return endpoints;
  }, {});
};

console.log('API loading...');
const api:TApi = apiLoad();
console.log('API loaded.');

export default api;
