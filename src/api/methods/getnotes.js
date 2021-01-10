const getnotes = async (request) => {
  const { session } = request;
  const findedSession = await Sessions.find('_id', session);
  const findedUser = await Users.find('_id', findedSession.result[0].userId);
  const { result } = await Notes.find('userId', findedUser.result[0].id);
  return {
    status: {
      code: 0,
      message: '',
    },
    data: { notes: result },
  };
};

// eslint-disable-next-line func-names
(function () {
  return getnotes;
}());
