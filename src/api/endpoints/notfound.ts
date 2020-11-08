const notfound = async (request: any, response: any) => {
  response.statusCode = 404;
  response.setHeader('Content-Type', 'application/json');
  response.write(JSON.stringify({ 404: 'endpoint not exist' }));
  response.end();
};

export default notfound;
