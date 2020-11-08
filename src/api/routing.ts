/* eslint-disable import/extensions */
/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import Users, { userType } from '../users';
// eslint-disable-next-line no-unused-vars
import Sessions, { sessionType } from '../sessions';

Users.add('test', 'test', ['/api/auth', '/api/unauth']);
Sessions.add('test');

interface httpObject {
    headers: object,
    statusCode: number,
    data: string,
  }

const checkAuthorization = async (username: string, password: string)
: Promise<boolean> => Users.find(username)
  .then((user) => user.password === password)
  .catch(() => false);

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

const route : {[index: string]: any} = {
  '/api/register': async (request: any, response: any, data: any) => {
    const { headers } = request;
    const contentType = headers['content-type'];
    if (contentType !== 'application/json') {
      response.statusCode = 400;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({ 400: 'not a JSON' }));
      response.end();
      return;
    }
    console.log(data);
    let dataJSON: userType;
    try {
      dataJSON = JSON.parse(data);
    } catch (e) {
      response.statusCode = 400;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({ 400: 'JSON error' }));
      response.end();
      return;
    }
    try {
      const { username, password } = dataJSON;
      const user: userType = await Users.add(username, password, ['default']);
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({ 200: JSON.stringify(user) }));
      response.end();
      return;
    } catch (error) {
      response.statusCode = 400;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({ 400: JSON.stringify(error) }));
      response.end();
    }
  },

  '/api/auth': async (request: any, response: any) => {
    const { headers } = request;
    const { username, password, session } = headers;

    if (session) {
      Sessions.delete(session)
        .catch(() => {});
    }
    const isAuth = username && password ? await checkAuthorization(username, password) : false;
    if (!isAuth) {
      response.statusCode = 401;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({ 401: 'authorization error' }));
    } else {
      const client = await Sessions.add(username);
      response.statusCode = 400;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({ 400: client }));
    }
    response.end();
  },

  '/api/unauth': (request: any, response: any) => {
    const { headers } = request;
    const { session } = headers;
    Sessions.find(session)
      .then((client) => Sessions.delete(client.id))
      .catch(() => {});
    response.statusCode = 200;
    response.end();
  },

  '/api/notfound': (request: any, response: any) => {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify({ 404: 'endpoint not exist' }));
    response.end();
  },

  '/api/unauthorization': (request: any, response: any) => {
    const { headers } = request;
    const { session } = headers;
    if (session) {
      Sessions.find(session)
        .then((client) => Sessions.delete(client.id))
        .catch(() => {});
    }
    response.statusCode = 401;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify({ 401: 'access denied - unauthorization' }));
    response.end();
  },
};

const routing = async (request: any, response: any, data: any): Promise<any> => {
  const { url, headers } = request;
  const { session } = headers;
  // определение наличия валидной сессии
  const sessionIsValid: boolean = await checkSession(session);
  let endpoint: string = '';
  if (!sessionIsValid && url !== '/api/register' && url !== '/api/auth') {
    endpoint = '/api/unauthorization';
  } else {
    endpoint = route.hasOwnProperty(url) ? url : '/api/notfound';
  }
  route[endpoint](request, response, data);
};

export default routing;
