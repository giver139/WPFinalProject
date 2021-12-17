import {connect} from 'mongoose';
import "dotenv-defaults/config";
export async function runMongo(): Promise<void> {
  try{
    await connect(process.env.MONGO_URL ?? '');
  } catch(err: unknown) {
    throw new Error(`MongoDB connection failed. ${err}`);
  }
}
