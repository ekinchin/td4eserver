/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { TRequestData, TResponseData } from '../../types';

const notfound = async (request: TRequestData): Promise<TResponseData> => ({
  status: {
    code: 1,
    message: 'not found',
  },
});

export default notfound;
