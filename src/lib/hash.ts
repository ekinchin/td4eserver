// eslint-disable-next-line no-unused-vars
import crypto, { BinaryToTextEncoding } from 'crypto';

const createHashFunction = (algo:string, encoding: BinaryToTextEncoding) => (data: string) => crypto
  .createHash(algo)
  .update(data)
  .digest(encoding);

export default createHashFunction;
