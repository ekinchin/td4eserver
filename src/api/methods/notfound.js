const notfound = async (request) => ({
  status: {
    code: 1,
    message: 'not found',
  },
});

// eslint-disable-next-line func-names
(function () {
  return notfound;
}());