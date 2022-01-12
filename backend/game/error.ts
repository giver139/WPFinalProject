export class GameCounterNotFoundError extends Error {
  name: string;
  constructor() {
    super('game counter not found error');
    this.name = 'GameCounterNotFoundError';
    Object.setPrototypeOf(this, GameCounterNotFoundError.prototype);
  }
}

export class PlayerNumberUnmatchError extends Error {
  name: string;
  constructor() {
    super('player number unmatch error');
    this.name = 'PlayerNumberUnmatchError';
    Object.setPrototypeOf(this, PlayerNumberUnmatchError.prototype);
  }
}

export class GameNotFoundError extends Error {
  name: string;
  constructor() {
    super('gameId not found');
    this.name = 'GameNotFoundError';
    Object.setPrototypeOf(this, GameNotFoundError.prototype);
  }
}

export class UserNotInGameError extends Error {
  name: string;
  constructor() {
    super('user not in the game');
    this.name = 'UserNotInGameError';
    Object.setPrototypeOf(this, UserNotInGameError.prototype);
  }
}

export class NotCurrentPlayerError extends Error {
  name: string;
  constructor() {
    super('user is not current player');
    this.name = 'NotCurrentPlayerError';
    Object.setPrototypeOf(this, NotCurrentPlayerError.prototype);
  }
}

