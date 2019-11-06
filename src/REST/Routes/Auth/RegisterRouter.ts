import { Request, Response } from 'koa';
// import * as AsyncHandler from 'koa-async-handler';
import * as bcrypt from 'bcryptjs'
// import { FacebookRegister, GoogleRegister } from '../../../Utils/PassportStrategies';
// import { ApiExceptionTranslate } from '../../../utils/ApiExceptions/ApiExceptionTranslate';
import { generateJWT } from '../../../Utils/generateJWT';
import {User} from '../../../Models';
import {getRepository} from 'typeorm';
import * as Router from 'koa-router';
// import { TranslateMessage } from '../../../Utils/Translation/Sentences';
import joi from 'joi';
import validate from 'koa-joi-validate';
//
// export const registerValidator = validate({
//     body: {
//         email: joi.string().email().required(),
//         firstName: joi.string().required(),
//         lastName: joi.string().required(),
//         password: joi.string().required()
//     }
// });

export const registerRoute = Router({
    prefix: '/auth'
});

function giveTokenToUser(ctx: any): void {
    ctx.status(200).json({ token: generateJWT(ctx.user) });
}

async function createUser(ctx: any, next) {
    ctx.body = ctx.request.body;
    if (await getRepository(User).findOne({
        where: {
            email: ctx.body.email
        }
    })) {
        next(ctx.throw(403, 'user already exist'));
    }
    console.log(ctx.body);
    const user = new User();
    user.email = ctx.body.email;
    user.firstName = ctx.body.firstName;
    user.lastName = ctx.body.lastName;
    user.tasks = [];
    user.teams = [];
    if (ctx.body.password) {
        user.password = await bcrypt.hashSync(ctx.body.password, 10);
    }

    ctx.body = {user: user};
    await getRepository(User).save(user);
}

registerRoute.post('/register',
    // registerValidator,
    createUser);


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
