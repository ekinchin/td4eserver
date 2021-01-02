/* eslint-disable import/extensions */
/* eslint-disable no-console */
import Users from '../../users';
import Sessions from '../../sessions';
// eslint-disable-next-line no-unused-vars
import type { TRequestData, TResponseData } from '../../types';

const checkAuthorization = async (username: string, password: string)
: Promise<boolean> => Users.find(username)
  .then((users) => {
    const { result, error } = users;
    if (!result || error) return false;
    const user = result[0];
    return password === user.password;
  });

const auth = async (request: TRequestData) : Promise<TResponseData> => {
  const { session, data } = request;
  const { username, password } = data ? JSON.parse(data) : undefined;

  if (session) {
    Sessions.delete(session)
      .catch(() => {});
  }
  const isAuth = username && password ? await checkAuthorization(username, password) : false;
  if (!isAuth || !username || !password) {
    return {
      status: {
        code: 1,
        message: ' authorization error',
      },
    };
  }
  const client = await Sessions.add(username);
  return {
    status: {
      code: 0,
      message: 'OK',
    },
    data: JSON.stringify(client.result),
  };
};

export default auth;
