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

const parse = (request: any) => {
  const { url, headers, body } = request;
  return { url, headers, body };
};

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
  '/api/auth': async (request: any, response: any) => {
    const { headers } = parse(request);
    const { username, password, session } = headers;

    if (session) {
      Sessions.find(session)
        .then((client) => Sessions.delete(client.id))
        .catch(() => {});
    }
    const isAuth = username && password ? await checkAuthorization(username, password) : false;
    if (!isAuth) {
      response.statusCode = 401;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({ 401: '' }));
    } else {
      const client = await Sessions.add(username);
      response.statusCode = 400;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({ 400: client }));
    }
    response.end();
  },
  '/api/unauth': (request: any, response: any) => {
    const { headers } = parse(request);
    const { session } = headers;
    Sessions.find(session)
      .then((client) => Sessions.delete(client.id))
      .catch(() => {});
    response.statusCode = 200;
    response.end();
  },
  '/api/notfound': (request: any, response: any) => {
    response.statusCode = 404;
    response.end();
  },
};

const routing = async (request: any, response: any): Promise<any> => {
  const { url, headers } = parse(request);
  const { session } = headers;
  // определение наличия валидной сессии
  const sessionIsValid: boolean = await checkSession(session);
  if (sessionIsValid || url === '/api/auth') {
    // eslint-disable-next-line no-prototype-builtins
    const endpoint = route.hasOwnProperty(url) ? url : '/api/notfound';
    route[endpoint](request, response);
  } else {
    response.writeHead(301, { Location: 'http://127.0.0.1:8000/api/auth' });
    response.end();
  }
};

export default routing;
