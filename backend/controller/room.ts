import {Request, Response} from 'express';
import {UserToken, hasUserToken} from './user_token';
import {createRoom} from '../room/create_room';
import {joinRoom} from '../room/join_room';
import {getRooms} from '../room/get_rooms';
import {leaveRoom} from '../room/leave_room';
import {RoomNotFoundError, UserNotInRoomError, UserAlreadyInRoomError} from '../room/error';
import {isInteger} from '../utils';

export function hasRoomId(data: unknown): data is {roomId: number} {
  const payload = data as {roomId: string};
  const roomId = Number(payload.roomId);
  if(!isInteger(roomId)) {
    return false;
  }
  (data as {roomId: number}).roomId = roomId;
  return true;
}

export async function enterRoom(req: Request, res: Response): Promise<void> {
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
  try {
    const room = await joinRoom(user.username, roomId);
    res.json({room});
  } catch(err: unknown) {
    if(err instanceof RoomNotFoundError) {
      res.status(403).json({error: 'roomId not found'});
    }
    else if(err instanceof UserAlreadyInRoomError) {
      res.status(403).json({error: 'user already in the room'});
    }
    else {
      res.status(500).json({error: 'join room error'});
    }
  }
}

export async function listRooms(req: Request, res: Response): Promise<void> {
  try {
    const rooms = await getRooms();
    res.json({rooms});
  } catch(err: unknown) {
    res.status(500).json({error: 'get rooms error'});
  }
}

export async function openRoom(req: Request, res: Response): Promise<void> {
  if(!hasUserToken(req)) {
    res.status(500).json({error: 'user token not found'});
    return;
  }
  const user = req.user;
  try {
    const room = await createRoom(user.username);
    res.json({room});
  } catch(err: unknown) {
    res.status(500).json({error: 'create room error'});
  }
}

export async function exitRoom(req: Request, res: Response): Promise<void> {
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
  try {
    await leaveRoom(user.username, roomId);
    res.json({});
  } catch(err: unknown) {
    if(err instanceof RoomNotFoundError) {
      res.status(403).json({error: 'roomId not found'});
    }
    else if(err instanceof UserNotInRoomError) {
      res.status(403).json({error: 'user not in this room'});
    }
    else {
      res.status(500).json({error: 'leave room error'});
    }
  }
}

