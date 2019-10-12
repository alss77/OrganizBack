import { Request, Response } from 'koa';
// import * as AsyncHandler from 'koa-async-handler';
import * as passport from 'passport';
import * as bcrypt from 'bcryptjs'
// import { FacebookRegister, GoogleRegister } from '../../../Utils/PassportStrategies';
// import { ApiExceptionTranslate } from '../../../utils/ApiExceptions/ApiExceptionTranslate';
import { generateJWT } from '../../../Utils/generateJWT';
import {User} from "../../../Models";
import {getRepository} from "typeorm";
import * as Router from "koa-router";
// import { TranslateMessage } from '../../../Utils/Translation/Sentences';

export const registerRoute = Router();

function giveTokenToUser(req: any, res: any): void {
    res.status(200).json({ token: generateJWT(req.user) });
}

async function validTokenInscription(req: any, res: Response, next: any) {
    const token = req.body.token_inscription;
    if (token == null) {
        // throw new ApiExceptionTranslate(403, TranslateMessage.BetaInscription);
    }
    next();
}

async function createUser(req: any, res: Response) {
    if (await getRepository(User).findOne({
        where: {
            userName: req.body.email
        }
    })) {
        // throw new ApiExceptionTranslate(403, TranslateMessage.BetaInscription);
    }
    const user = new User();
    user.email = req.email;
    if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
    }

    await getRepository(User).save(user);
}

registerRoute.post('/register',
    createUser
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
