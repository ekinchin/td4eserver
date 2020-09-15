interface httpObject {
    headers: object,
    statusCode: number,
    data: string,
  }

const route = {
  '/': null,
  '/api/auth': (request: any, data: any) => {
    const answer: httpObject = {
      headers: { 'Set-Cookie': ['session=1; HttpOnly; Secure; max-age=3600'] },
      statusCode: 300,
      data: '',
    };
    return answer;
  },
  '/api/unauth': null,
  '/api/accessdenied': null,
  '/api/getNote': null,
  '/api/setNote': null,
  '/api/updateNote': null,
  '/api/searchNote': null,
  '/api/deleteNote': null,
  undefined: null,
};

const checkAuthorization = (request: any) : boolean => false;

const routing = (request: any, response: any, data: any): httpObject => (checkAuthorization(request) ? routing(request, response, data) : route['/api/auth'](request, data));

export default routing;
