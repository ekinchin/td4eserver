/* eslint-disable import/extensions */
import Users from '../../users';

const userlist = async (request: any, response: any, data: any) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.write(JSON.stringify({ 200: JSON.stringify(await Users.find('')) }));
  response.end();
};

export default userlist;
