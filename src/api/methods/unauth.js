// eslint-disable-next-line no-unused-vars
const unauth = async (request) => {
  const { session } = request;
  const deleted = await Sessions.delete(session);
  const { result } = deleted;
  return {
    status: {
      code: 0,
      message: 'OK',
    },
    data: { session: result.id },
  };
};

// eslint-disable-next-line func-names
(function () {
  return unauth;
}());
