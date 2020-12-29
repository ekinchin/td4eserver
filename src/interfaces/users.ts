/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { TUser, TError } from '../types';

export interface IUser {
  find: (username: string) => Promise<{result?: Array<TUser>, error?: TError}>,
  add: (username: string, password: string,) => Promise<{result?: TUser, error?: TError}>,
  delete: (id: string) => Promise<{result?: TUser, error?: TError}>,
}
