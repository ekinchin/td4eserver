/* eslint-disable import/extensions */
import { Schema } from 'mongoose';
// eslint-disable-next-line import/prefer-default-export
export const noteSchema = new Schema({
  id: Number,
  date: String,
  userId: String,
  text: String,
});
