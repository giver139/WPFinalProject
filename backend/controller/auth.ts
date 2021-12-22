import express from 'express';
import "dotenv-defaults/config";
import jwt from 'jsonwebtoken';
import {UserToken, isUserToken} from './user_token';

const SECRET_KEY = process.env.SECRET_KEY ?? '';

function hasAuth(headers: unknown): headers is {authorization: string} {
  return (headers as {authorization: string}).authorization !== undefined;
}

export function checkAuth(req: express.Request, res: express.Response, next: express.NextFunction){
  if(!hasAuth(req.headers)) {
    res.status(401).json({error: 'no authorization token'});
    return;
  }
  let token = req.headers.authorization;
  if(!token.startsWith('Bearer ')) {
    res.status(401).json({error: 'invalid token format'});
    return;
  }
  token = token.slice(7);
  try {
    const jwtPayload = jwt.verify(token, SECRET_KEY);
    if(!isUserToken(jwtPayload)) {
      throw new Error('invalid token content');
    }
    (req as unknown as {user: UserToken}).user = jwtPayload;
  } catch(err: unknown) {
    res.status(401).json({error: 'invalid token'});
    return;
  }
  next();
}

export function generateToken(payload: UserToken, expireSeconds: number = 86400): string {
  const token = `Bearer ${jwt.sign(payload, SECRET_KEY, {expiresIn: expireSeconds})}`;
  return token;
}
