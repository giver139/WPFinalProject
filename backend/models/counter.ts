import {Schema, model} from 'mongoose';

export interface Counter {
  model: string;
  count: number;
}

const schema = new Schema<Counter>({
  model: {type: String, required: true},
  count: {type: Number, required: true},
});

export const CounterModel = model<Counter>('Counter', schema);
export default CounterModel;
