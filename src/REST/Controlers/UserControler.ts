import {getRepository} from 'typeorm';
import {User} from '../../Models';

export async function getAllUser(ctx) {
    ctx.body = await getRepository(User).find();
    ctx.status = 200;
}
