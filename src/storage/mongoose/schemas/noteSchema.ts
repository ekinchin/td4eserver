/* eslint-disable import/extensions */
import { Schema } from 'mongoose';
// eslint-disable-next-line import/prefer-default-export
export const noteSchema = new Schema({
  date: String,
  userId: String,
  text: String,
});
