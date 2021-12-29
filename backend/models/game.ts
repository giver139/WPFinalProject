import {Schema, model, Types} from 'mongoose';

export const GAME_MODEL = 'game';

export interface Game {
  gameId: number;
  players: string[];
  timestamp: Date;
  blackPlayer: number;
  initialBoard: number[];
  board: number[];
}

export interface MongoGame extends Game {
  players: Types.Array<string>;
  initialBoard: Types.Array<number>;
  board: Types.Array<number>;
};

const schema = new Schema<MongoGame>({
  gameId: {type: Number, required: true},
  players: {type: [String], required: true},
  timestamp: {type: Date, required: true},
  blackPlayer: {type: Number, required: true},
  initialBoard: {type: [Number], required: true},
  board: {type: [Number], required: true},
});

export const GameModel = model<MongoGame>('Game', schema);
export default GameModel;

