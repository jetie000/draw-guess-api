import { randomBytes } from 'crypto';

export const randomCode = (length: number) =>
  randomBytes(length)
    .toString('base64')
    .replace(/\+/g, '')
    .replace(/\//g, '')
    .replace(/\=/g, '')
    .toUpperCase()
    .slice(0, length);
