import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../Models';
import { JWT_key } from './generateJWT';
import { env } from '../../environnement/local';

export async function retrieveUser(authorization: string): Promise<User> {
  let token = authorization;
  console.log('token', token);
  if (token == null || token.slice(0, 7) !== 'bearer ') {
    return null;
  }
  token = token.slice(7);
  let userID;
  try {
    userID = (jwt.verify(token, JWT_key) as any).data;
  } catch (e) {
    console.log('Error Verify');
    return null;
  }

  return getRepository(User).findOne({
    where: { id: userID },
    select: ['id', 'firstName', 'lastName', 'email']
  });
}

export function verifyToken(ctx, next) {
  let token = ctx.request.headers['authorization'];
  if (!token)
    return ctx.response.status(401).send({ auth: false, message: 'Unauthorized' });
  if (token.startsWith('Bearer '))
    token = token.slice(7, token.length);
  jwt.verify(token, env.jwt_secret, function(err, decoded) {
    if (err) {
      console.log(err);
      return ctx.response.status(403).send({auth: false, message: 'Forbidden'});
    }
    // if everything good, save to request for use in other routes
    ctx.request.userId = decoded.id;
    next();
  });
}
