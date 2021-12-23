import {User} from '../models/user';

export class UserView {
  readonly username: string;
  readonly nickname: string;
  constructor(user: User) {
    this.username = user.username;
    this.nickname = user.nickname;
  }
}
