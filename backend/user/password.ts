import {hash, compare} from 'bcrypt';

const SALT_ROUNDS = 10;

export function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export function generatePassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS);
}
