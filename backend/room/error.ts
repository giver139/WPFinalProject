export class RoomNotFoundError extends Error {
  name: string;
  constructor() {
    super('roomId not found');
    this.name = 'RoomNotFoundError';
    Object.setPrototypeOf(this, RoomNotFoundError.prototype);
  }
}

export class UserNotInRoomError extends Error {
  name: string;
  constructor() {
    super('user not in the room');
    this.name = 'UserNotInRoomError';
    Object.setPrototypeOf(this, UserNotInRoomError.prototype);
  }
}
