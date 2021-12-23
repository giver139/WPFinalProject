import {UserView} from '../views/user';
import {UserModel, User} from '../models/user';
import {UserNotFoundError} from './error';

export async function getUserByName(username: string): Promise<UserView> {
  const user = await UserModel.findOne({username});
  if(!user) {
    throw new UserNotFoundError;
  }
  return new UserView(user);
}
