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
      };
    }
  } else {
    return {
      status: {
        code: 2,
        message: 'json parse fail',
      },
    };
  }
  const { username, password } = dataJSON;
  const exists = await Users.find(username);
  if (exists.result) {
    return {
      status: {
        code: 3,
        message: 'already exist',
      },
      data: JSON.stringify({ error: 'user already exo=ists' }),
    };
  }
  const user = await Users.add(username, password);
  return {
    status: {
      code: 3,
      message: 'already exist',
    },
    data: JSON.stringify({ user: JSON.stringify(user.result) }),
  };
};

// eslint-disable-next-line func-names
(function () {
  return register;
}());
