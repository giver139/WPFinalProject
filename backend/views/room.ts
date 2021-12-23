import {Room} from '../models/room';

export class RoomView {
  readonly roomId: number;
  readonly players: ReadonlyArray<string>;
  readonly timestamp: Date;
  constructor(room: Room) {
    this.roomId = room.roomId;
    this.players = [...room.players];
    this.timestamp = room.timestamp;
  }
}
