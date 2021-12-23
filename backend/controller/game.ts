import {Request, Response} from 'express';
import {UserToken, hasUserToken} from './user_token';
import {hasRoomId} from './room';
import {checkUserInRoom} from '../room/check_user_in_room';
import {checkUserInGame} from '../game/check_user_in_game';
import {startGame} from '../game/start_game';
import {getValidMovesFromSource} from '../game/get_valid_moves_from_source';
import {confirmMove} from '../game/confirm_move';
import {PlayerNumberUnmatchError} from '../game/error';
import {InvalidSourceSelectionError, NoPossibleDestinationError, InvalidDestinationSelectionError} from '../board/error';
import {isInteger} from '../utils';

function hasGameId(data: unknown): data is {gameId: number} {
  const payload = data as {gameId: string};
  const gameId = Number(payload.gameId);
  if(!isInteger(gameId)) {
    return false;
  }
  (data as {gameId: number}).gameId = gameId;
  return true;
}


function hasSource(data: unknown): data is {source: number} {
  const payload = data as {source: string};
  const source = Number(payload.source);
  if(!isInteger(source) || source < 0 || source >= 32) {
    return false;
  }
  (data as {source: number}).source = source;
  return true;
}

function hasDestination(data: unknown): data is {destination: number} {
  const payload = data as {destination: string};
  const destination = Number(payload.destination);
  if(!isInteger(destination) || destination < 0 || destination >= 32) {
    return false;
  }
  (data as {destination: number}).destination = destination;
  return true;
}

function hasFirstClickParams(data: unknown): data is {gameId: number, source: number} {
  return hasGameId(data) && hasSource(data);
}

function hasSecondClickParams(data: unknown): data is {source: number, destination: number, gameId: number} {
  return hasGameId(data) && hasSource(data) && hasDestination(data);
}

export async function roomStartGame(req: Request, res: Response): Promise<void> {
  if(!hasUserToken(req)) {
    res.status(500).json({error: 'user token not found'});
    return;
  }
  const user = req.user;
  if(!hasRoomId(req.params)) {
    res.status(403).json({error: 'invalid roomId'});
    return;
  }
  const roomId = req.params.roomId;
  try {
    if(!await checkUserInRoom(user.username, roomId)) {
      res.status(403).json({error: 'user not in the room'});
      return;
    }
  } catch(err: unknown) {
    res.status(500).json({error: 'check user in room error'});
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
      res.status(500).json({error: 'start game error'});
    }
  }
}

export async function firstClick(req: Request, res: Response): Promise<void> {
  if(!hasUserToken(req)) {
    res.status(500).json({error: 'user token not found'});
    return;
  }
  const user = req.user;
  if(!hasFirstClickParams(req.params)) {
    res.status(403).json({error: 'invalid parameters'});
    return;
  }
  const {source, gameId} = req.params;
  try {
    if(!await checkUserInGame(user.username, gameId)) {
      res.status(403).json({error: 'user not in the game'});
      return;
    }
  } catch(err: unknown) {
    res.status(500).json({error: 'check user in game error'});
    return;
  }
  try {
    const moves = await getValidMovesFromSource(user.username, gameId, source);
    res.json({destination: moves});
  } catch(err: unknown) {
    if(err instanceof InvalidSourceSelectionError) {
      res.status(403).json({error: 'invalid source selection error'});
    }
    else if(err instanceof NoPossibleDestinationError) {
      res.status(403).json({error: 'no possible destination for selected sourceition error'});
    }
    else {
      res.status(500).json({error: 'get valid destination error'});
    }
  }
}

export async function secondClick(req: Request, res: Response): Promise<void> {
  if(!hasUserToken(req)) {
    res.status(500).json({error: 'user token not found'});
    return;
  }
  const user = req.user;
  if(!hasSecondClickParams(req.params)) {
    res.status(403).json({error: 'invalid parameters'});
    return;
  }
  const {gameId, source, destination} = req.params;
  try {
    if(!await checkUserInGame(user.username, gameId)) {
      res.status(403).json({error: 'user not in the game'});
      return;
    }
  } catch(err: unknown) {
    res.status(500).json({error: 'check user in game error'});
    return;
  }
  try {
    await confirmMove(user.username, gameId, source, destination);
    res.json({});
  } catch(err: unknown) {
    if(err instanceof InvalidSourceSelectionError) {
      res.status(403).json({error: 'invalid source selection error'});
    }
    else if(err instanceof InvalidDestinationSelectionError) {
      res.status(403).json({error: 'invalid destination selection error'});
    }
    else {
      res.status(500).json({error: 'get valid destination error'});
    }
  }
}

