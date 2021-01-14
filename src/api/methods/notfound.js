const notfound = async (request) => ({
  status: {
    code: 1,
    message: 'not found',
  },
  data: {
    error: 'not found',
  },
});

module.exports = notfound;
