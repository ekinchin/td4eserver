/* eslint-disable no-console */
/* eslint-disable import/extensions */
import mongoose from 'mongoose';
// eslint-disable-next-line no-unused-vars
import { IStorage } from '../interfaces/storage';
import { userSchema, sessionSchema, noteSchema } from './schemas';

type TQuery = { [index: string]:string};

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

class storage implements IStorage {
  Model: any;

  constructor(database: string) {
    switch (database) {
      case 'user':
        this.Model = mongoose.model('User', userSchema);
        break;
      case 'session':
        this.Model = mongoose.model('Session', sessionSchema);
        break;
      case 'note':
        this.Model = mongoose.model('Note', noteSchema);
        break;
      default:
        break;
    }
  }

  async delete(field: string, value: string) : Promise<string> {
    const query: TQuery = {};
    query[field] = value;
    return this.Model.deleteMany(query).exec();
  }

  async read(field: string, value: string) : Promise<string> {
    const query: TQuery = {};
    query[field] = value;
    return this.Model.find(query).exec();
  }

  async create(document: string) : Promise<string> {
    const doc = JSON.parse(document);
    const item = new this.Model(doc);
    try {
      return JSON.stringify(await item.save());
    } catch (err) {
      return err.toString();
    }
  }

  async update(field: string, value: string) : Promise<string> {
    return `method not implemented. ${this.Model} - ${field}: ${value}`;
  }
}

export default storage;
