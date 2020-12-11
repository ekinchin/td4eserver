/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { TError, TUser } from '../types';

export interface IUser {
  find: (username: string) => Promise<TUser | TError>,
  add: (username: string, password: string,) => Promise<TUser | TError>,
  delete: (id: string) => Promise<TUser | TError>,
}
