/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { TRequestData, TResponseData } from '../../types';

const unauth = async (request: TRequestData): Promise<TResponseData> => ({
  status: {
    code: 1,
    message: 'Unauthorized',
  },
  data: JSON.stringify({ error: 'Unauthorized' }),
});

export default unauth;
