import {RoomView} from '../views/room';
import {Room, RoomModel} from '../models/room';
import {RoomNotFoundError, UserAlreadyInRoomError} from './error';
import {WebSocketConnection} from '../websocket/web_socket_connection';

export async function joinRoom(username: string, roomId: number): Promise<RoomView> {
  const room = await RoomModel.findOne({roomId});
  if(!room) {
    throw new RoomNotFoundError;
  }
  const index = room.players.indexOf(username);
  if(index !== -1) {
    throw new UserAlreadyInRoomError;
  }
  room.players.push(username);
  await room.save();
  WebSocketConnection.broadcastJoinRoom(roomId, username);
  return new RoomView(room);
}
