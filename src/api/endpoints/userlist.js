const userlist = async (request) => ({
  status: {
    code: 0,
    message: '',
  },
  data: JSON.stringify({ users: JSON.stringify(await Users.find('')) }),
});

// eslint-disable-next-line func-names
(function () {
  return userlist;
}());
