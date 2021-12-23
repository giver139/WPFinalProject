import {RoomView} from '../views/room';
import {Room, RoomModel} from '../models/room';
import {RoomNotFoundError} from './error';

export async function joinRoom(username: string, roomId: number): Promise<RoomView> {
  const room = await RoomModel.findOne({roomId});
  if(!room) {
    throw new RoomNotFoundError;
  }
  room.players.push(username);
  await room.save();
  return new RoomView(room);
}
