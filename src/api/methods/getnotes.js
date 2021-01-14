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

module.exports = getnotes;
