const checkAuthorization = async (username, password) => Users.find('username', username)
  .then((users) => {
    const { result, error } = users;
    if (!result || error) return false;
    const user = result[0];
    const valid = hash(password) === user.password;
    const { id } = user;
    return { valid, id };
  });

const auth = async (request) => {
  const { session, data } = request;
  const { username, password } = data ? JSON.parse(data) : undefined;
  if (session) Sessions.delete(session);
  const { valid, id } = username && password
    ? await checkAuthorization(username, password)
    : { valid: false };
  if (!valid || !username || !password) {
    return {
      status: {
        code: 1,
        message: 'authorization error',
      },
    };
  }
  const client = await Sessions.add(id);
  const { result } = client;
  return {
    status: {
      code: 0,
      message: 'OK',
    },
    data: { session: result.id, dateOfExpiry: result.dateOfExpiry },
  };
};

module.exports = auth;
