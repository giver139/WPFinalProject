import {UserModel} from '../models/user';
import {comparePassword} from './password';
import {UserNotFoundError} from './error';

export async function checkPassword(username: string, password: string): Promise<boolean> {
  const user = await UserModel.findOne({username});
  if(!user) {
    throw new UserNotFoundError;
  }
  const hashedPassword = user.password;
  return comparePassword(password, hashedPassword);
}

