import {Request, Response} from 'express';
import {checkPassword} from '../user/password';
import {createUser} from '../user/create_user';
import {generateToken} from './auth';
import {UserToken, EMPTY_TOKEN} from './user_token';

interface LoginPayload {
  username: string;
  password: string;
};

function isLoginPayload(data: unknown): data is LoginPayload {
  const payload = data as LoginPayload;
  return payload.username !== undefined && payload.password !== undefined;
}

interface RegisterPayload {
  username: string;
  password: string;
  nickname: string;
};

function isRegisterPayload(data: unknown): data is RegisterPayload {
  const payload = data as RegisterPayload;
  return payload.username !== undefined && payload.password !== undefined && payload.nickname !== undefined;
}


export async function login(req: Request, res: Response): Promise<void> {
  if(!isLoginPayload(req.body)) {
    res.status(403).json({error: 'incorrect payload'});
    return;
  }
  const {username, password} = req.body;
  try {
    if(!await checkPassword(username, password)) {
      res.status(403).json({error: 'incorrect username or password'});
      return;
    }
  } catch(err: unknown) {
    res.status(500).json({error: 'check password error'});
    return;
  }
  const payload: UserToken = {username};
  const token = generateToken(payload);
  res.json({token});
}

export async function register(req: Request, res: Response): Promise<void> {
  if(!isRegisterPayload(req.body)) {
    res.status(403).json({error: 'incorrect payload'});
    return;
  }
  const {username, password, nickname} = req.body;
  try {
    await createUser(username, password, nickname);
  } catch(err: unknown) {
    res.status(500).json({error: 'register user error'});
    return;
  }
  res.json({});
}

export async function logout(req: Request, res: Response): Promise<void> {
  const token = generateToken(EMPTY_TOKEN, 0);
  res.json({token});
}

