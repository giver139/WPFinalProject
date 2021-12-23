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

