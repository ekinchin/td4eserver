const unauthorization = async (request) => ({
  status: {
    code: 1,
    message: 'Unauthorized',
  },
  data: { error: 'Unauthorized' },
});

// eslint-disable-next-line func-names
(function () {
  return unauthorization;
}());
