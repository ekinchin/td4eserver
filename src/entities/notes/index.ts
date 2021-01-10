/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import { INotes } from '../../interfaces/notes';
// eslint-disable-next-line no-unused-vars
import { IStorage } from '../../interfaces/storage';
// eslint-disable-next-line no-unused-vars
import type { TNote, TError } from '../../types';

class NotesClass implements INotes {
  storage: IStorage<TNote>;

  constructor(database: IStorage<TNote>) {
    this.storage = database;
  }

  async find(field: string, value: string) :Promise<{ result?: TNote[], error?: TError }> {
    const { result, error } = await this.storage.read(field, value);
    return { result, error };
  }

  async add(note: TNote): Promise<{ result?: TNote, error?: TError}> {
    const document = JSON.stringify(note);
    const { result, error } = await this.storage.create(document);
    return { result, error };
  }

  async delete(id: string): Promise<{ result?: TNote, error?: TError}> {
    const { result, error } = await this.storage.delete('_id', id);
    return { result, error };
  }
}

// eslint-disable-next-line import/prefer-default-export
export { NotesClass };
