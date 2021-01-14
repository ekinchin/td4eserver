const unauthorization = async (request) => ({
  status: {
    code: 1,
    message: 'Unauthorized',
  },
  data: { error: 'Unauthorized' },
});

module.exports = unauthorization;
