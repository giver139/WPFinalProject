import {Game} from '../models/game';

export class GameView {
  readonly gameId: number;
  readonly players: ReadonlyArray<string>;
  readonly timestamp: Date;
  readonly blackPlayer: number;
  readonly currentPlayer: number;
  readonly board: ReadonlyArray<number>;
  readonly noFlipEatCount: number;
  constructor(game: Game) {
    this.gameId = game.gameId;
    this.players = [...game.players];
    this.timestamp = game.timestamp;
    this.blackPlayer = game.blackPlayer;
    this.currentPlayer = game.currentPlayer;
    this.board = [...game.board];
    this.noFlipEatCount = game.noFlipEatCount;
  }
}
