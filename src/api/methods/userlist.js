const userlist = async (request) => ({
  status: {
    code: 0,
    message: '',
  },
  data: { users: await Users.find('') },
});

module.exports = userlist;
