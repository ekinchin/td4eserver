/* eslint-disable import/extensions */
const { Users } = ('../../users');

const unregister = async (request) => {
  const { data } = request;
  const { username } = data ? JSON.parse(data) : undefined;
  const result = await Users.delete(username);
  if (result) {
    return {
      status: {
        code: 0,
        message: '',
      },
      data: JSON.stringify({ user: result }),
    };
  }
  return {
    status: {
      code: 1,
      message: '',
    },
  };
};

// eslint-disable-next-line func-names
(function () {
  return unregister;
}());
