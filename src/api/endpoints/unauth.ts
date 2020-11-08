/* eslint-disable import/extensions */
/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import Sessions from '../../sessions';

const unauth = async (request: any, response: any) => {
  const { headers } = request;
  const { session } = headers;
  Sessions.find(session)
    .then((client) => Sessions.delete(client.id))
    .catch(() => {});
  response.statusCode = 200;
  response.end();
};

export default unauth;
