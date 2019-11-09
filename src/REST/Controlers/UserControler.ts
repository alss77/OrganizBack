import {getRepository} from 'typeorm';
import {User} from '../../Models';

export async function getAllUser(ctx) {
    ctx.body = await getRepository(User).find();
    ctx.status = 200;
}

export async function getUserByEmail(ctx) {
    console.log(ctx.request.query);
    const user = await getRepository(User).find(
      {
          where: {email: ctx.request.query},
          select: ['id', 'firstName', 'lastName', 'email'],
          relations: ['teams', 'tasks']
      });
    ctx.body = {user: user};
    ctx.status = 200;
}
