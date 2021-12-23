import {UserView} from '../views/user';
import {UserModel, User} from '../models/user';
import {generatePassword} from './password';
import {InvalidInformationError, UserExistedError} from './error';

export async function createUser(username: string, password: string, nickname: string): Promise<UserView> {
  if(username.length === 0 || password.length === 0 || nickname.length === 0) {
    throw new InvalidInformationError;
  }
  const user = await UserModel.findOne({username});
  if(user) {
    throw new UserExistedError;
  }
  const hashedPassword = await generatePassword(password);
  const newUser = new UserModel({username, password: hashedPassword, nickname});
  await newUser.save();
  return new UserView(newUser);
}
