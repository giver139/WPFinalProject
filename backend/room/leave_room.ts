import {RoomModel} from '../models/room';
import {RoomNotFoundError, UserNotInRoomError} from './error';

export async function leaveRoom(username: string, roomId: number): Promise<void> {
  const room = await RoomModel.findOne({roomId});
  if(!room) {
    throw new RoomNotFoundError;
  }
  const index = room.players.indexOf(username);
  if(index === -1) {
    throw new UserNotInRoomError;
  }
  room.players.splice(index, 1);
  if(room.players.length === 0) {
    await room.remove();
  }
  else {
    await room.save();
  }
}
