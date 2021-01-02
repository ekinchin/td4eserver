/* eslint-disable import/extensions */
import Users from '../../users';
// eslint-disable-next-line no-unused-vars
import type { TRequestData, TResponseData } from '../../types';

const userlist = async (request: TRequestData): Promise<TResponseData> => ({
  status: {
    code: 0,
    message: '',
  },
  data: JSON.stringify({ users: JSON.stringify(await Users.find('')) }),
});

export default userlist;
