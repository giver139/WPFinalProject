import {userModel, User} from '../models/user';
import {generatePassword} from './password';

export async function createUser(username: string, password: string, nickname: string): Promise<User> {
  if(username.length === 0 || password.length === 0 || nickname.length === 0) {
    throw new Error('invalid user information');
  }
  const user = await userModel.findOne({username});
  if(user) {
    throw new Error('username existed');
  }
  const hashedPassword = await generatePassword(password);
  const newUser = new userModel({username, password: hashedPassword, nickname});
  await newUser.save();
  return newUser;
}
