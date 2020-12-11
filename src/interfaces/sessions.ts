/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { TError, TSession } from '../types';

export interface ISessions {
  find: (id: string) => Promise<TSession | TError>,
  add: (username: string) => Promise<TSession | TError>,
  delete: (id: string) => Promise<TSession | TError>,
}
