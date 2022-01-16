import {RoomView} from '../views/room';
import {Room, RoomModel} from '../models/room';
import {RoomNotFoundError, UserAlreadyInRoomError, RoomIsFullError} from './error';
import {WebSocketConnection} from '../websocket/web_socket_connection';

export async function joinRoom(username: string, roomId: number): Promise<RoomView> {
  const room = await RoomModel.findOne({roomId});
  console.log(roomId);
  console.log(room)
  if(!room) {
    throw new RoomNotFoundError;
  }
  const index = room.players.indexOf(username);
  if(index !== -1) {
    throw new UserAlreadyInRoomError;
  }
  if(room.players.length === 2) {
    throw new RoomIsFullError;
  }
  room.players.push(username);
  await room.save();
  WebSocketConnection.broadcastJoinRoom(roomId, username);
  return new RoomView(room);
}
