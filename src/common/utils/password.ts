import * as bcrypt from 'bcryptjs';

export function hash(password: string) {
  return bcrypt.hashSync(password, 15);
}

export function compare(password: string, hashPassword: string) {
  return bcrypt.compareSync(password, hashPassword);
}