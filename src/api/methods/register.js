const register = async (request) => {
  let dataJSON;
  const { data } = request;
  if (data) {
    try {
      dataJSON = JSON.parse(data);
    } catch (e) {
      return {
        status: {
          code: 2,
          message: 'json parse fail',
        },
        data: { error: 'json parse error' },
      };
    }
  } else {
    return {
      status: {
        code: 2,
        message: 'user data not received',
      },
      data: { error: 'user data not received' },
    };
  }
  const { username, password } = dataJSON;
  if (!username || !password) {
    return {
      status: {
        code: 3,
        message: 'empty username or password',
      },
      data: { error: 'empty username or password' },
    };
  }
  const exists = await Users.find('username', username);
  if (exists.result) {
    return {
      status: {
        code: 3,
        message: 'already exist',
      },
      data: { error: 'user already exists' },
    };
  }
  const user = await Users.add(username, password);
  return {
    status: {
      code: 0,
      message: 'already exist',
    },
    data: { username: user.result.username },
  };
};

// eslint-disable-next-line func-names
(function () {
  return register;
}());
