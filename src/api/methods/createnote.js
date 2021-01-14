const createnote = async (request) => {
  const { data, userId } = request;
  const note = JSON.parse(data);
  note.userId = userId;
  const { result } = await Notes.add(note);
  if (result) {
    return {
      status: {
        code: 0,
        message: '',
      },
      data: { id: result.id, text: result.text },
    };
  }
};

module.exports = createnote;
