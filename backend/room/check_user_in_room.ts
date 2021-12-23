import {RoomModel} from '../models/room';
import {RoomNotFoundError, UserNotInRoomError} from './error';

export async function checkUserInRoom(username: string, roomId: number): Promise<boolean> {
  const room = await RoomModel.findOne({roomId});
  if(!room) {
    return false;
  }
  const index = room.players.indexOf(username);
  return index !== -1;
}
