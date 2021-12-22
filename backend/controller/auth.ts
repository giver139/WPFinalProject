import expressJwt from 'express-jwt';
import "dotenv-defaults/config";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY ?? '';

export const validateUser = expressJwt({secret: SECRET_KEY, algorithms: ['HS256']});

export function generateToken(payload: object, expireSeconds: number): string {
  const token = `Bearer ${jwt.sign(payload, SECRET_KEY, {expiresIn: expireSeconds})}`;
  return token;
}
