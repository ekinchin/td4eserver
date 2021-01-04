/* eslint-disable import/extensions */
/* eslint-disable-next-line no-unused-vars */
import type { TRequestData, TResponseData } from '../../types';

const Users = require('../../users');

const userlist = async (request: TRequestData): Promise<TResponseData> => ({
  status: {
    code: 0,
    message: '',
  },
  data: JSON.stringify({ users: JSON.stringify(await Users.find('')) }),
});

(function () {
  console.log('dirty');
  return userlist;
}());
