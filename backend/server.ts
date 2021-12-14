import {runMongo} from './mongo';
import express from 'express';
import cors from 'cors';

runMongo();

const app = express();
app.use(cors());
app.use(express.json());

const port = Number(process.env.PORT ?? 4000);
app.listen(port,() => {});
