const deletenote = async (request) => {
  const { data, userId } = request;
  const deleteReq = JSON.parse(data);
  const findedNotes = await Notes.find('_id', deleteReq.id);
  if (findedNotes.result[0].userId === userId) {
    const { result } = await Notes.delete(deleteReq.id);
    return {
      status: {
        code: 0,
        message: '',
      },
      data: { id: result.id, text: result.text },
    };
  }
  return {
    status: {
      code: 1,
      message: 'error',
    },
    data: { errror: 'cannot delete note' },
  };
};

// eslint-disable-next-line func-names
(function () {
  return deletenote;
}());
