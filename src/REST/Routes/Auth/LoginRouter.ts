import * as Router from 'koa-router'
import {generateJWT} from '../../../Utils/generateJWT'
import * as passport from 'koa-passport'

export const loginRoute = Router({prefix: '/auth'});

function giveTokenToUser(req: any, res: any): void {
    res.status(200).json({ token: generateJWT(req.user) });
}

loginRoute.post(
    '/local',
    passport.authenticate('local'),
    giveTokenToUser
);
