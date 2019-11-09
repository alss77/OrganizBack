import * as Router from 'koa-router';
import * as passport from 'koa-passport'
// import {json} from 'body-parser';
import {generateJWT} from '../../../Utils/generateJWT'
import {getRepository} from 'typeorm';
import {User} from '../../../Models';
import * as joi from 'joi';
import * as validate from 'koa-joi-validate';

export const loginValidator = validate({
    body: {
        email: joi.string().email().required(),
        password: joi.string().required()
    }
});
export const loginRoute = Router({prefix: '/auth'});

async function giveTokenToUser(ctx: any, next: () => Promise<any>) {
    ctx.body = ctx.request.body;
    const user = await getRepository(User).findOne({
        where: {
            email: ctx.body.email.toLowerCase()
        },
        select: ['id', 'firstName', 'lastName', 'email'],
        relations: ['teams']
    });
    const tokenUser = generateJWT(user);
    console.log('token dbg:', tokenUser);
    if (tokenUser) {
        ctx.status = 200;
        ctx.body = {
            token: tokenUser,
            user: user
        };
    } else {
        ctx.throw(403, 'Token Generation Error');
    }
    return next();
}

loginRoute.post(
    '/local',
    loginValidator,
    passport.authenticate('local'),
    giveTokenToUser
);
