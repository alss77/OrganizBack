import {json} from 'body-parser';

const Router = require('koa-router');
import {generateJWT} from '../../../Utils/generateJWT'
import * as passport from 'koa-passport'
import {getRepository} from 'typeorm';
import {User} from '../../../Models';

export const loginRoute = Router({prefix: '/auth'});

async function giveTokenToUser(ctx: any, next: () => Promise<any>) {
    ctx.body = ctx.request.body;
    const user = await getRepository(User).findOne({
        where: {
            email: ctx.body.email.toLowerCase()
        }
    });
    ctx.status = 200;
    ctx.body = { token: generateJWT(user) };
    // ctx.status = ctx.request.response.status;
    console.log(ctx.status);
    return next();
}

loginRoute.post(
    '/local',
    passport.authenticate('local'),
    giveTokenToUser
);

loginRoute.get('/local', async (ctx, next) =>{
    ctx.body = 'qwetujufghjkhgf';
    return next;
});
