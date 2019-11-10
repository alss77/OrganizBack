import * as Router from 'koa-router';
import { getAllUser, getUserByEmail } from '../Controlers/UserControler';
import { retrieveUser, verifyToken } from '../../Utils/retrieveUser';
import { getRepository } from 'typeorm';
import { Task } from '../../Models/entity/Card';
import { Team } from '../../Models/entity/Team';

export const userRoute = Router({
    prefix: '/user'
});

userRoute.get('/all', getAllUser);

userRoute.get('/me', async (ctx) => {
    ctx.body = await retrieveUser(ctx.request.header['authorization']);
    console.log(ctx.body);
});

userRoute.get('/task', async (ctx) => {
   ctx.body = await getRepository(Task).find({relations: ["users", "team"]});
});

userRoute.get('/team', async (ctx) => {
   const teamId = ctx.request.body.id;
   try {
       const team = await getRepository(Team).findOne(teamId, { relations: ["task"]});
       ctx.body = { team: team };
   } catch (e) {
       ctx.throw(403, 'Team not found');
   }
});
