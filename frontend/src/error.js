export class InternalServerError extends Error {
  constructor(msg) {
    super(`internal server error: ${msg}`);
    this.name = 'InternalServerError';
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export class UnknownError extends Error {
  constructor() {
    super('unknown error');
    this.name = 'UnknownError';
    Object.setPrototypeOf(this, UnknownError.prototype);
  }
}

export class RequireLoginError extends Error {
  constructor() {
    super('api access require login error');
    this.name = 'RequireLoginError';
    Object.setPrototypeOf(this, RequireLoginError.prototype);
  }
}

export class InvalidPayloadError extends Error {
  constructor() {
    super('invalid payload error');
    this.name = 'InvalidPayloadError';
    Object.setPrototypeOf(this, InvalidPayloadError.prototype);
  }
}

export class IncorrectUsernameOrPasswordError extends Error {
  constructor() {
    super('incorrect username or password error');
    this.name = 'IncorrectUsernameOrPasswordError';
    Object.setPrototypeOf(this, IncorrectUsernameOrPasswordError.prototype);
  }
}

export class UsernameAlreadyExistsError extends Error {
  constructor() {
    super('username has already existed error');
    this.name = 'UsernameAlreadyExistsError';
    Object.setPrototypeOf(this, UsernameAlreadyExistsError.prototype);
  }
}

export class RoomIdNotFoundError extends Error {
  constructor() {
    super('roomId not found error');
    this.name = 'RoomIdNotFoundError';
    Object.setPrototypeOf(this, RoomIdNotFoundError.prototype);
  }
}

export class UserAlreadyInTheRoomError extends Error {
  constructor() {
    super('user has been already in the room error');
    this.name = 'UserAlreadyInTheRoomError';
    Object.setPrototypeOf(this, UserAlreadyInTheRoomError.prototype);
  }
}

export class UserNotInTheRoomError extends Error {
  constructor() {
    super('user is not in the room error');
    this.name = 'UserNotInTheRoomError';
    Object.setPrototypeOf(this, UserNotInTheRoomError.prototype);
  }
}

export class PlayerNumberUnmatchError extends Error {
  constructor() {
    super('player number is not 2 error');
    this.name = 'PlayerNumberUnmatchError';
    Object.setPrototypeOf(this, PlayerNumberUnmatchError.prototype);
  }
}

export class InvalidParametersError extends Error {
  constructor() {
    super('invalid parameters error');
    this.name = 'InvalidParametersError';
    Object.setPrototypeOf(this, InvalidParametersError.prototype);
  }
}

export class UserNotInTheGameError extends Error {
  constructor() {
    super('user is not in the game error');
    this.name = 'UserNotInTheGameError';
    Object.setPrototypeOf(this, UserNotInTheGameError.prototype);
  }
}

export class InvalidSourceSelectionError extends Error {
  constructor() {
    super('invalid source selection error');
    this.name = 'InvalidSourceSelectionError';
    Object.setPrototypeOf(this, InvalidSourceSelectionError.prototype);
  }
}

export class NoPossibleDestinationError extends Error {
  constructor() {
    super('no possible destination for the selected source error');
    this.name = 'NoPossibleDestinationError';
    Object.setPrototypeOf(this, NoPossibleDestinationError.prototype);
  }
}

export class InvalidDestinationSelectionError extends Error {
  constructor() {
    super('invalid destination selection error');
    this.name = 'InvalidDestinationSelectionError';
    Object.setPrototypeOf(this, InvalidDestinationSelectionError.prototype);
  }
}

export class NotYourTurnError extends Error {
  constructor() {
    super('not your turn to move error');
    this.name = 'NotYourTurnError';
    Object.setPrototypeOf(this, NotYourTurnError.prototype);
  }
}

