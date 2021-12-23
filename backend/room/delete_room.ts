import {RoomModel} from '../models/room';

export async function deleteRoom(roomId: number): Promise<void> {
  await RoomModel.deleteOne({roomId});
}
