/* eslint-disable import/extensions */
import type {
  // eslint-disable-next-line no-unused-vars
  TRequestData, TResponseData, TApi, TUser,
} from '../types';
// eslint-disable-next-line no-unused-vars
import { ISessions } from '../interfaces/sessions';
// eslint-disable-next-line no-unused-vars
import { IUser } from '../interfaces/users';

const API_PREFIX = '/api/';

const createWebController = (api: TApi, Sessions: ISessions, Users: IUser) => {
  const checkSession = async (id: string): Promise<boolean> => {
    if (id === 'null') return false;
    const sessions = await Sessions.find('_id', id);
    if (!sessions.result) return false;
    const session = sessions.result[0];
    return !((Date.now() > session.dateOfExpiry));
  };

  const getUserIdbySession = async (session: string): Promise<string> => {
    const findedSession = await Sessions.find('_id', session);
    if (findedSession.result) {
      return findedSession.result[0].userId;
    }
    return '';
  };

  const getUserInfo = async (userId: string): Promise<TUser> => {
    const findedUser = await Users.find('_id', userId);
    if (findedUser.result) {
      const user = findedUser.result[0];
      user.password = '';
      user.id = user.id.toString();
      return user;
    }
    return {
      id: '',
      username: '',
      password: '',
      permissions: { allow: [], deny: [] },
    };
  };

  const parseRequest = (request: any, data: string): TRequestData => ({
    endpoint: request.url.toLowerCase().replace(API_PREFIX, ''),
    data,
    session: request.headers.session,
  });

  const router = async (request: TRequestData): Promise<TResponseData> => {
    const { session, endpoint } = request;
    // определение наличия валидной сессии
    const sessionIsValid: boolean = session ? await checkSession(session) : false;
    let validEndpoint: string = '';
    if (sessionIsValid || endpoint === 'register' || endpoint === 'auth') {
      // eslint-disable-next-line no-prototype-builtins
      validEndpoint = api.hasOwnProperty(endpoint) ? endpoint : 'notfound';
    } else {
      validEndpoint = 'unauthorization';
    }
    if (session && sessionIsValid) {
      const userId = await getUserIdbySession(session);
      const user = await getUserInfo(userId);
      request.username = user.username;
      request.userId = user.id;
    }
    return api[validEndpoint](request);
  };

  return async (request:any, response:any, data:any) => {
    const { url, method } = request;
    if (!url.startsWith(API_PREFIX) || method !== 'POST') {
      response.statusCode = 403;
      response.end();
      return;
    }
    const parsedRequest = parseRequest(request, data);
    const endpointAnswer = await router(parsedRequest);
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    if (endpointAnswer.data) response.write(JSON.stringify(endpointAnswer.data));
  };
};

export default createWebController;
