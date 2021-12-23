import {connect} from 'mongoose';
import "dotenv-defaults/config";
import {UserModel} from './models/user';
import {RoomModel} from './models/room';
import {GameModel} from './models/game';
import {CounterModel} from './models/counter';
import {GAME_MODEL} from './models/game';

async function resetMongo(): Promise<void> {
  await UserModel.deleteMany({});
  await RoomModel.deleteMany({});
  await GameModel.deleteMany({});
  await CounterModel.deleteMany({});
}

async function initializeMongo(): Promise<void> {
  // await resetMongo();
  const gameCounter = await CounterModel.findOne({model: GAME_MODEL});
  if(!gameCounter) {
    const newGameCounter = new CounterModel({model: GAME_MODEL, count: 0});
    newGameCounter.save();
  }
}

export async function runMongo(): Promise<void> {
  try {
    await connect(process.env.MONGO_URL ?? '');
  } catch(err: unknown) {
    throw new Error(`MongoDB connection failed. ${err}`);
  }
  try {
    await initializeMongo();
  } catch(err: unknown) {
    throw new Error(`Initialize MongoDB data failed. ${err}`);
  }
}
