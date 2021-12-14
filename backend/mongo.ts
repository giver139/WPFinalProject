import {connect} from 'mongoose';
import "dotenv-defaults/config";
export async function runMongo(): Promise<void> {
  await connect(process.env.MONGO_URL ?? '');
}
