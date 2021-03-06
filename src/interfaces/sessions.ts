/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { TSession, TError } from '../types';

export interface ISessions {
  find: (field: string, value: string) => Promise<{result?: Array<TSession>, error?: TError}>,
  add: (userId: string) => Promise<{result?: TSession, error?: TError}>,
  delete: (id: string) => Promise<{result?: TSession, error?: TError}>,
}
