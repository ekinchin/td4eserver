const getnotes = async (request) => {
  const { userId } = request;
  const { result } = await Notes.find('userId', userId);
  return {
    status: {
      code: 0,
      message: '',
    },
    data: { notes: result },
  };
};

// eslint-disable-next-line func-names
(function () {
  return getnotes;
}());
