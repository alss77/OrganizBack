import * as Router from 'koa-router';
import { getAllUser, getUserByEmail } from '../Controlers/UserControler';
import { retrieveUser, verifyToken } from '../../Utils/retrieveUser';
import { getRepository } from 'typeorm';
import { Task } from '../../Models/entity/Card';

export const userRoute = Router({
    prefix: '/user'
});

userRoute.get('/all', getAllUser);

userRoute.get('/me', verifyToken, async (ctx) => {
    console.log(ctx.request);
    ctx.body = await retrieveUser(ctx.request.header['authorization']);
});

userRoute.get('/task', async (ctx) => {
   ctx.body = await getRepository(Task).find({relations: ["users", "teams"]});
});
