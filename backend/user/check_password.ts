import {userModel} from '../models/user';
import {comparePassword} from './password';

export async function checkPassword(username: string, password: string): Promise<boolean> {
  const user = await userModel.findOne({username});
  if(!user) {
    throw new Error('username not found');
  }
  const hashedPassword = user.password;
  return comparePassword(password, hashedPassword);
}

