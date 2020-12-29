/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { TSession, TError } from '../types';

export interface ISessions {
  find: (id: string) => Promise<{result?: Array<TSession>, error?: TError}>,
  add: (username: string) => Promise<{result?: TSession, error?: TError}>,
  delete: (id: string) => Promise<{result?: TSession, error?: TError}>,
}
