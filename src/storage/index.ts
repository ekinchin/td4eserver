/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import mongoose from 'mongoose';
// eslint-disable-next-line no-unused-vars
import { IStorage } from '../interfaces/storage';
import type {
  // eslint-disable-next-line no-unused-vars
  TError, TUser, TSession, TNote,
} from '../types';
import { userSchema, sessionSchema, noteSchema } from './schemas';

type TQuery = { [index: string]:string};

const models: {[index: string]:any} = {
  User: {
    model: mongoose.model('User', userSchema),
    toJSON: (input: any): TUser => ({
      username: input.username,
      password: input.password,
      permissions: input.permissions,
    }),
  },
  Session: {
    model: mongoose.model('Session', sessionSchema),
    toJSON: (input: any): TSession => ({
      id: input._id,
      username: input.username,
      dateOfExpiry: input.dateOfExpiry,
    }),
  },
  Note: {
    model: mongoose.model('Note', noteSchema),
    toJSON: (input: any) => ({
      id: input._id,
      date: input.date,
      text: input.text,
    }),
  },
};

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

class storage<T> implements IStorage<T> {
  Model: any;

  private toJSON: (record: string) => T;

  constructor(database: string) {
    this.Model = models[database].model;
    this.toJSON = models[database].toJSON;
  }

  async delete(field: string, value: string) : Promise<{result?: T, error?: TError}> {
    const query: TQuery = {};
    query[field] = value;
    const result: T = this.toJSON(await this.Model.deleteOne(query).exec());
    return {
      result,
    };
  }

  async read(field: string, value: string) : Promise<{result?: Array<T>, error?: TError}> {
    const query: TQuery = {};
    if (field && value) {
      query[field] = value;
    }
    const readed: any[] = await this.Model.find(query).exec();
    if (readed.length > 0) {
      readed.forEach((element) => { this.toJSON(element); });
      return { result: readed };
    }
    return {
      error: {
        message: 'not found',
        code: 1,
      },
    };
  }

  async create(document: string) : Promise<{result?: T, error?: TError}> {
    const doc = JSON.parse(document);
    const item = new this.Model(doc);
    const result: T = this.toJSON(await item.save());
    return {
      result,
    };
  }

  async update(field: string, value: string) : Promise<{result?: T, error?: TError}> {
    return {
      error: {
        code: 1,
        message: `method update not implemented. ${this.Model} - ${field}: ${value}`,
      },
    };
  }
}

export default storage;
