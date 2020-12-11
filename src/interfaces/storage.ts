/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import type { TError } from '../types';

export interface IStorage <T>{
  create:(document: string) => Promise<string | TError>,
  read: (field: string, value: string) => Promise<string | TError>,
  update: (field: string, value: string, document: string) => Promise<string | TError>,
  delete: (field: string, value: string) => Promise<string | TError>,
}
