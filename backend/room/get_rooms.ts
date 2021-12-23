import {RoomView} from '../views/room';
import {RoomModel} from '../models/room';

export async function getRooms(): Promise<RoomView[]> {
  const rooms = await RoomModel.find({});
  return rooms.map(room => new RoomView(room));
}
