const unregister = async (request) => {
  const { data, session } = request;
  const { username, password } = data ? JSON.parse(data) : undefined;
  const findedSession = await Sessions.find('_id', session);
  const findedUser = await Users.find('_id', findedSession.result[0].userId);
  if (username === findedUser.result[0].username && password === findedUser.result[0].password) {
    const deleted = await Users.delete(username);
    const { result } = deleted;
    if (result) {
      return {
        status: {
          code: 0,
          message: '',
        },
        data: { username: result.username },
      };
    }
  }
  return {
    status: {
      code: 1,
      message: '',
    },
    data: { error: 'your token !== your username' },
  };
};

// eslint-disable-next-line func-names
(function () {
  return unregister;
}());
