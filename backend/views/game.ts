import {Game} from '../models/game';

export class GameView {
  readonly gameId: number;
  readonly players: ReadonlyArray<string>;
  readonly timestamp: Date;
  constructor(game: Game) {
    this.gameId = game.gameId;
    this.players = [...game.players];
    this.timestamp = game.timestamp;
  }
}
