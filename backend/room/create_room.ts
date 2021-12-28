import {RoomView} from '../views/room';
import {Room, RoomModel} from '../models/room';
import {WebSocketConnection} from '../websocket/web_socket_connection';

async function getNextId(): Promise<number> {
  const rooms = await RoomModel.find({});
  const nextId = rooms.reduce((previousNumber: number, currentRoom: Room) => Math.max(previousNumber, currentRoom.roomId + 1), 0);
  return nextId;
}

export async function createRoom(username: string): Promise<RoomView> {
  const roomId = await getNextId();
  const room = new RoomModel({roomId, players: [username], timestamp: Date.now()});
  await room.save();
  const roomView = new RoomView(room);
  WebSocketConnection.broadcastNewRoom(roomView);
  return roomView;
}
