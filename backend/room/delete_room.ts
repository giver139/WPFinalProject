import {RoomModel} from '../models/room';
import {WebSocketConnection} from '../websocket/web_socket_connection';

export async function deleteRoom(roomId: number): Promise<void> {
  await RoomModel.deleteOne({roomId});
  WebSocketConnection.broadcastCloseRoom(roomId);
}
