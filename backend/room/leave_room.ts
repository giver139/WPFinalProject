import {RoomModel} from '../models/room';
import {RoomNotFoundError, UserNotInRoomError} from './error';
import {RoomView} from '../views/room';
import {WebSocketConnection} from '../websocket/web_socket_connection';

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
  WebSocketConnection.broadcastLeaveRoom(roomId, username);
  if(room.players.length === 0) {
    await room.remove();
    WebSocketConnection.broadcastCloseRoom(roomId);
  }
  else {
    await room.save();
  }
}
