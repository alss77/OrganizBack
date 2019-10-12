import * as jwt from 'jsonwebtoken';
import { User } from '../Models';

export const JWT_key: string = process.env.JWT_KEY;

export function generateJWT(user: User, expiresIn: string = '10d'): string {
    return jwt.sign(
        {
            data: user.id,
        },
        JWT_key,
        { expiresIn }
    );
}
