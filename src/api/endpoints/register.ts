/* eslint-disable import/extensions */
import Users from '../../users';
// eslint-disable-next-line no-unused-vars
import type { userType } from '../../users';

const register = async (request: any, response: any, data: any) => {
  const { headers } = request;
  const contentType = headers['content-type'];
  if (contentType !== 'application/json') {
    response.statusCode = 400;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify({ 400: 'not a JSON' }));
    response.end();
    return;
  }
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
};

export default register;
