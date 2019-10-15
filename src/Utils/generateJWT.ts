import * as jwt from 'jsonwebtoken';
import { User } from '../Models';

export const JWT_key: string = 'oulalala secret';

export function generateJWT(user: User, expiresIn: string = '10d'): string {
    console.log('USER JWT', user);
    return jwt.sign(
        {
            data: user.id,
        },
        JWT_key,
        { expiresIn }
    );
}
