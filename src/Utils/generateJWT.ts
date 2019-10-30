import * as jwt from 'jsonwebtoken';
import { User } from '../Models';
import { env } from '../../environnement/local';

export const JWT_key: string = env.jwt_secret;

export function generateJWT(user: User, expiresIn: string = '10d'): string {
    return jwt.sign(
        {
            data: user.id,
        },
        JWT_key,
        { expiresIn }
    );
}
