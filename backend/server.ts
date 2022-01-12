import {runMongo} from './mongo';
import express from 'express';
import cors from 'cors';
import {router} from './router/route';
import {createServer} from 'http';
import {Server as WebSocketServer} from 'ws';
import {onWssConnection} from './websocket/on_connection';

runMongo();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api',router);

const port = Number(process.env.PORT || 4000);
const server = createServer(app);
const wss = new WebSocketServer({server});
wss.on('connection', onWssConnection);
server.listen(port);
