/* eslint-disable import/extensions */
/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import Sessions from '../../sessions';

const unauth = async (request: any, response: any) => {
  response.statusCode = 200;
  response.end();
};

export default unauth;
