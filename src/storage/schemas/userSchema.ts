/* eslint-disable import/extensions */
import { Schema } from 'mongoose';
// eslint-disable-next-line import/prefer-default-export
export const userSchema = new Schema({
  UUID: String,
  username: String,
  password: String,
  permission: {
    allow: [String],
    deny: [String],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
