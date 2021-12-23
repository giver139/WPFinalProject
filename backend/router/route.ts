import express from 'express';
import {checkAuth} from '../controller/auth';
import {login, register, logout} from '../controller/user';
import {enterRoom, listRooms, openRoom, exitRoom} from '../controller/room';
import {roomStartGame, firstClick, secondClick} from '../controller/game';

export const router = express.Router();

router.post('/login', login);
router.post('/register', register);

const loginRouter = express.Router();

router.use(loginRouter);

loginRouter.use(checkAuth);

loginRouter.post('/logout', logout);
loginRouter.post('/joinRoom/:roomId', enterRoom);
loginRouter.get('/allRooms', listRooms);
loginRouter.post('/createRoom', openRoom);
loginRouter.post('/leaveRoom/:roomId', exitRoom);
loginRouter.post('/startGame/:roomId', roomStartGame);
loginRouter.get('/firstClick', firstClick);
loginRouter.post('/secondClick', secondClick);

