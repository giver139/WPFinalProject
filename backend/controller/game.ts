import {Request, Response} from 'express';
import {UserToken, hasUserToken} from './user_token';
import {hasRoomId} from './room';
import {checkUserInRoom} from '../room/check_user_in_room';
import {startGame} from '../game/start_game';
import {PlayerNumberUnmatchError} from '../game/error';

export async function roomStartGame(req: Request, res: Response): Promise<void> {
  if(!hasRoomId(req.params)) {
    res.status(403).json({error: 'invalid roomId'});
    return;
  }
  const roomId = req.params.roomId;
  if(!hasUserToken(req)) {
    res.status(500).json({error: 'user token not found'});
    return;
  }
  const user = req.user;
  if(!await checkUserInRoom(user.username, roomId)) {
    res.status(403).json({error: 'user not in the room'});
    return;
  }
  try {
    const game = await startGame(roomId);
    res.json({game});
  } catch(err: unknown) {
    if(err instanceof PlayerNumberUnmatchError) {
      res.status(403).json({error: 'player number is not 2'});
    }
    else {
      res.status(500).json({error: `start game error ${err}`});
    }
  }
}

export async function firstClick(req: Request, res: Response): Promise<void> {

}

export async function secondClick(req: Request, res: Response): Promise<void> {

}

