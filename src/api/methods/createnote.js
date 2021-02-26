const createnote = async (request) => {
  const { data, userId } = request;
  let note = {};
  try {
    note = JSON.parse(data);
  } catch (e) {
    return {
      status: {
        code: 1,
        message: e.message,
      },
    };
  }
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
