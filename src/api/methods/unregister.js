const unregister = async (request) => {
  const { data, userId } = request;
  const { username, password } = data ? JSON.parse(data) : undefined;
  const findedUser = await Users.find('_id', userId);
  if (username === findedUser.result[0].username && hash(password) === findedUser.result[0].password) {
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

module.exports = unregister;
