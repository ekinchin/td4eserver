/* eslint-disable import/extensions */
import Users from '../../users';
// eslint-disable-next-line no-unused-vars
import type { TUser, TRequestData, TResponseData } from '../../types';

const unregister = async (request: TRequestData): Promise<TResponseData> => {
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

export default unregister;
