export interface Game {
  gameId: number;
  players: ReadonlyArray<string>;
  timestamp: Date;
  blackPlayer: number;
  board: ReadonlyArray<number>;
}

export interface Move {
  source: string;
  destination: string;
}

export interface Room {
  roomId: number;
  players: ReadonlyArray<string>;
  timestamp: Date;
}

export interface User {
  username: string;
  nickname: string;
}
