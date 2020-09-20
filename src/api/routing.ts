/* eslint-disable no-console */
interface httpObject {
    headers: object,
    statusCode: number,
    data: string,
  }

const route : {[index: string]: any} = {
  '/': null,
  '/api/auth': (request: any, response: any, data: any) => {
    console.log('/api/auth');
    const headers = { 'Set-Cookie': ['session=1; HttpOnly; Secure; max-age=3600'] };
    response.writeHead(300, headers);
    response.end();
  },
  '/api/unauth': null,
  '/api/accessdenied': null,
  '/api/unauthorized': (request: any, response: any, data: any) => {
    console.log('/api/unauthorized');
    response.writeHead(401, {});
    response.end();
  },
  '/api/getNote': null,
  '/api/setNote': null,
  '/api/updateNote': null,
  '/api/searchNote': null,
  '/api/deleteNote': null,
  undefined: null,
};

const checkAuthorization = (request: any) : boolean => false;

const routing = (request: any, response: any, data: any): httpObject => {
  console.log('hello');
  const { url } : {url: string} = request;
  return (checkAuthorization(request)
    ? route[url](request, response, data)
    : route['/api/unauthorized'](request, response, data));
};

export default routing;
