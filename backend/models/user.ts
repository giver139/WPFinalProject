import {Schema, model} from 'mongoose';

export interface User {
  username: string;
  password: string;
  nickname: string;
}

const schema = new Schema<User>({
  username: {type: String, required: true},
  password: {type: String, required: true},
  nickname: {type: String, required: true},
});

export const userModel = model<User>('User', schema);
export default userModel;
