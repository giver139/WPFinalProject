import {runMongo} from './mongo';
import express from 'express';
import cors from 'cors';
import {router} from './router/route';

runMongo();

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

const port = Number(process.env.PORT ?? 4000);
app.listen(port,() => {});
