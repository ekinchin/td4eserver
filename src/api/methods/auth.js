const checkAuthorization = async (username, password) => Users.find(username)
  .then((users) => {
    const { result, error } = users;
    if (!result || error) return false;
    const user = result[0];
    const valid = password === user.password;
    const { id } = user;
    return { valid, id };
  });

const auth = async (request) => {
  const { session, data } = request;
  const { username, password } = data ? JSON.parse(data) : undefined;

  if (session) {
    Sessions.delete(session)
      .catch(() => {});
  }
  const { valid, id } = username && password ? await checkAuthorization(username, password) : { valid: false };
  if (!valid || !username || !password) {
    return {
      status: {
        code: 1,
        message: ' authorization error',
      },
    };
  }
  const client = await Sessions.add(id);
  return {
    status: {
      code: 0,
      message: 'OK',
    },
    data: JSON.stringify(client.result),
  };
};

// eslint-disable-next-line func-names
(function () {
  return auth;
}());
