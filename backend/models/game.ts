import {Schema, model, Types} from 'mongoose';

export const GAME_MODEL = 'game';

export interface Game {
  gameId: number;
  players: string[];
  timestamp: Date;
}

export interface MongoGame extends Game {
  players: Types.Array<string>;
};

const schema = new Schema<MongoGame>({
  gameId: {type: Number, required: true},
  players: {type: [String], required: true},
  timestamp: {type: Date, required: true}
});

export const GameModel = model<MongoGame>('Game', schema);
export default GameModel;

