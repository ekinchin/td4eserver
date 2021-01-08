/* eslint-disable import/extensions */
import { Schema } from 'mongoose';
// eslint-disable-next-line import/prefer-default-export
export const sessionSchema = new Schema({
  userId: String,
  dateOfExpiry: Number,
});
