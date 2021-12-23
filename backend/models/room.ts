import {Schema, model, Types} from 'mongoose';

export interface Room {
  roomId: number;
  players: string[];
  timestamp: Date;
}

export interface MongoRoom extends Room {
  players: Types.Array<string>;
};

const schema = new Schema<MongoRoom>({
  roomId: {type: Number, required: true},
  players: {type: [String], required: true},
  timestamp: {type: Date, required: true}
});

export const RoomModel = model<MongoRoom>('Room', schema);
export default RoomModel;
