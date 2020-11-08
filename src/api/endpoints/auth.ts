/* eslint-disable import/extensions */
/* eslint-disable no-console */
import Users from '../../users';
import Sessions from '../../sessions';

const checkAuthorization = async (username: string, password: string)
: Promise<boolean> => Users.find(username)
  .then((user) => user.password === password)
  .catch(() => false);

const auth = async (request: any, response: any) => {
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
};

export default auth;
