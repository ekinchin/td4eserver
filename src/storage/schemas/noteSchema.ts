/* eslint-disable import/extensions */
import { Schema } from 'mongoose';
// eslint-disable-next-line import/prefer-default-export
export const noteSchema = new Schema({
  date: String,
  text: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});
