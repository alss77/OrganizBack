import { Request, Response } from 'koa';
// import * as AsyncHandler from 'koa-async-handler';
import * as passport from 'passport';
import * as bcrypt from 'bcryptjs'
// import { FacebookRegister, GoogleRegister } from '../../../Utils/PassportStrategies';
// import { ApiExceptionTranslate } from '../../../utils/ApiExceptions/ApiExceptionTranslate';
import { generateJWT } from '../../../Utils/generateJWT';
import {User} from '../../../Models';
import {getRepository} from 'typeorm';
import * as Router from 'koa-router';
import { ApiException } from '../../../Utils/ApiException';
// import { TranslateMessage } from '../../../Utils/Translation/Sentences';

export const registerRoute = Router({
    prefix: '/auth'
});

function giveTokenToUser(ctx: any): void {
    ctx.status(200).json({ token: generateJWT(ctx.user) });
}

async function validTokenInscription(ctx: any, next: any) {
    const token = ctx.body.token_inscription;
    if (token == null) {
        // throw new ApiExceptionTranslate(403, TranslateMessage.BetaInscription);
        throw 'errrrrrrrrot';
    }
    next();
}

async function createUser(ctx: any, next) {
    ctx.body = ctx.request.body;
    if (await getRepository(User).findOne({
        where: {
            email: ctx.body.email
        }
    })) {
        next(ctx.throw(403, 'user exist'));
    }
    const user = new User();
    user.email = ctx.body.email;
    user.firstName = ctx.body.firstName;
    user.lastName = ctx.body.lastName;
    if (ctx.body.password) {
        user.password = await bcrypt.hashSync(ctx.body.password, 10);
    }

    await getRepository(User).save(user);
}

registerRoute.post('/register',
    createUser
    // giveTokenToUser
    );


// const FBAuth = passport.authenticate(FacebookRegister, { session: false });
//
// const GoogleAuth = passport.authenticate(GoogleRegister, { session: false });
//
// registerRoute.post(
//     '/facebook',
//     AssyncHandler(validTokenInscription),
//     FBAuth,
//     giveTokenToUser
// );
//
// registerRoute.post(
//     '/google',
//     AssyncHandler(validTokenInscription),
//     GoogleAuth,
//     giveTokenToUser
// );
