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

export class UserAlreadyInRoomError extends Error {
  name: string;
  constructor() {
    super('user already in the room');
    this.name = 'UserAlreadyInRoomError';
    Object.setPrototypeOf(this, UserAlreadyInRoomError.prototype);
  }
}
