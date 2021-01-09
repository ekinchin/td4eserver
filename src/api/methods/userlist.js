const userlist = async (request) => ({
  status: {
    code: 0,
    message: '',
  },
  data: { users: await Users.find('') },
});

// eslint-disable-next-line func-names
(function () {
  return userlist;
}());
