/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/extensions */
import fs from 'fs';
import vm from 'vm';
import Sessions from '../sessions';
// eslint-disable-next-line no-unused-vars
import type { TSession, TRequestData, TResponseData } from '../types';

const safeRequire = (module: string) => {
  console.log('safeRequire', module);
  const safeModule = module.startsWith('../') ? module.slice(3) : module;
  return require(safeModule);
};

const endpointsDeclaration = [
  // {
  //   name: 'auth',
  //   context: {},
  // },{
  //   name: 'notfound',
  //   context: {},
  // },{
  //   name: 'register',
  //   context: {},
  // },{
  //   name: 'unauth',
  //   context: {},
  // },{
  //   name: 'unauthorization',
  //   context: {},
  // },{
  //   name: 'unregister',
  //   context: {},
  // },
  {
    name: 'userlist',
    context: { require: safeRequire, JSON },
  },
];

const API_DIR = './build/api/endpoints';

type apiType = {[index: string]: any, };

const apiLoad = () => {
  const files = fs.readdirSync(API_DIR);
  const loadable = files.filter((filename) => filename !== 'index.js' && filename.endsWith('.js'));
  const existsEndpoints = endpointsDeclaration.filter((endpoint) => loadable.includes(`${endpoint.name}.js`));
  return existsEndpoints.reduce<Record<string, string>>((endpoints, endpoint) => {
    const { name, context } = endpoint;
    const contextify = vm.createContext(context);
    const source = fs.readFileSync(`${API_DIR}/${name}.js`).toString();
    const f = vm.runInContext(source, contextify);
    console.log(f);
    // eslint-disable-next-line no-param-reassign
    endpoints[name] = f;
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
  console.log('hello', api['userlist']);
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
