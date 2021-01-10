const createnote = async (request) => {
  const { data, session } = request;
  const findedSession = await Sessions.find('_id', session);
  const findedUser = await Users.find('_id', findedSession.result[0].userId);
  const note = JSON.parse(data);
  note.userId = findedUser.result[0].id;
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

// eslint-disable-next-line func-names
(function () {
  return createnote;
}());
