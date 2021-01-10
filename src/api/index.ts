/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/extensions */
import fs from 'fs';
import vm from 'vm';
// eslint-disable-next-line no-unused-vars
import type { TApiMethod, TApi } from '../types';
// eslint-disable-next-line no-unused-vars
import { ISessions } from '../interfaces/sessions';
// eslint-disable-next-line no-unused-vars
import { IUser } from '../interfaces/users';
// eslint-disable-next-line no-unused-vars
import { INotes } from '../interfaces/notes';

type TEndpointDeclaration = {
  name: string,
  context: Object,
}
type TEndpointsDeclaration = Array<TEndpointDeclaration>;

const API_DIR = './build/api/methods';

const safeRequire = (module: string) => {
  const safeModule = module.startsWith('../') ? module.slice(3) : module;
  // eslint-disable-next-line global-require
  return require(safeModule);
};

const apiLoad = (endpointsDeclaration:TEndpointsDeclaration) => {
  const files = fs.readdirSync(API_DIR);
  const loadable = files.filter((filename) => filename !== 'index.js' && filename.endsWith('.js'));
  console.log(loadable);
  const existsEndpoints = endpointsDeclaration.filter((endpoint) => loadable.includes(`${endpoint.name}.js`));
  console.log('Exists enpoints: ', existsEndpoints);
  return existsEndpoints.reduce<Record<string, TApiMethod>>((endpoints, endpoint) => {
    const { name, context } = endpoint;
    console.log(`loading ${name}`);
    const sandbox = vm.createContext(context);
    const source = fs.readFileSync(`${API_DIR}/${name}.js`).toString();
    const f: TApiMethod = vm.runInContext(source, sandbox);
    // eslint-disable-next-line no-param-reassign
    endpoints[`${name}`] = f;
    return endpoints;
  }, {});
};

const createAPi = (Sessions: ISessions, Users: IUser, Notes: INotes) => {
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
    }, {
      name: 'getnotes',
      context: {
        require: safeRequire, JSON, console, Sessions, Users, Notes,
      },
    }, {
      name: 'createnote',
      context: {
        require: safeRequire, JSON, console, Sessions, Users, Notes,
      },
    }, {
      name: 'deletenote',
      context: {
        require: safeRequire, JSON, console, Sessions, Users, Notes,
      },
    },
  ];
  console.log('API loading...');
  const api:TApi = apiLoad(endpointsDeclaration);
  console.log('API loaded.');
  return api;
};

export default createAPi;
