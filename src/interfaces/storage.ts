/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { TError } from '../types';

export interface IStorage<T>{
  create:(document: string) => Promise<{result?: T, error?: TError}>,
  read: (field: string, value: string) => Promise<{result?: Array<T>, error?: TError}>,
  update: (
    field: string,
    value: string,
    document: string) => Promise<{result?: T, error?: TError}>
  delete: (field: string, value: string) => Promise<{result?: T, error?: TError}>,
}
