/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { TNote, TError } from '../types';

export interface INotes {
  find: (field: string, value: string) => Promise<{result?: Array<TNote>, error?: TError}>,
  add: (note: TNote) => Promise<{result?: TNote, error?: TError}>,
  delete: (id: string) => Promise<{result?: TNote, error?: TError}>,
}
