/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { TRequestData, TResponseData, TApi } from '../types';
import { Sessions } from '../entities';

const checkSession = async (id: string): Promise<boolean> => {
  const sessions = await Sessions.find(id);
  if (!sessions.result) return false;
  const session = sessions.result[0];
  return !((Date.now() > session.dateOfExpiry));
};

const parseRequest = (request: any, data: string): TRequestData => ({
  endpoint: request.url,
  data,
  session: request.headers.session,
});

const webController = (api: TApi) => {
  const router = async (request: TRequestData): Promise<TResponseData> => {
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

  return async (request:any, response:any, data:any) => {
    const { url, method } = request;
    if (!url.startsWith('/api/') || method !== 'POST') {
      response.statusCode = 403;
      response.end();
      return;
    }
    const parsedRequest = parseRequest(request, data);
    const endpointAnswer = await router(parsedRequest);
    response.statusCode = endpointAnswer.status.code ? 400 : 200;
    response.setHeader('Content-Type', 'application/json');
    if (endpointAnswer.data) response.write(JSON.stringify(endpointAnswer.data));
    response.end();
  };
};

export default webController;
