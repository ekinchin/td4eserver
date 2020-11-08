/* eslint-disable import/extensions */
/* eslint-disable no-console */
import Sessions from '../../sessions';

const unauthorization = async (request: any, response: any) => {
  const { headers } = request;
  const { session } = headers;
  if (session) {
    Sessions.find(session)
      .then((client) => Sessions.delete(client.id))
      .catch(() => {});
  }
  response.statusCode = 401;
  response.setHeader('Content-Type', 'application/json');
  response.write(JSON.stringify({ 401: 'access denied - unauthorization' }));
  response.end();
};

export default unauthorization;
