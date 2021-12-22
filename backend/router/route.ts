import express from 'express';
import {checkAuth} from '../controller/auth';
import {login, register, logout} from '../controller/user';
import {joinRoom, listRooms, createRoom, leaveRoom} from '../controller/room';
import {startGame, firstClick, secondClick} from '../controller/game';

export const router = express.Router();

router.post('/login', login);
router.post('/register', register);

const loginRouter = express.Router();

router.use(loginRouter);

loginRouter.use(checkAuth);

loginRouter.post('/logout', logout);
loginRouter.post('/joinRoom/:roomId', joinRoom);
loginRouter.get('/allRooms', listRooms);
loginRouter.post('/createRoom', createRoom);
loginRouter.post('/leaveRoom/:roomId', leaveRoom);
loginRouter.post('/startGame/:roomId', startGame);
loginRouter.get('/firstClick', firstClick);
loginRouter.post('/secondClick', secondClick);

