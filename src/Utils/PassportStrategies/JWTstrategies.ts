import * as passport from 'koa-passport';
import {ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import {JWT_key} from "../generateJWT";
import {getRepository} from "typeorm";
import {User} from "../../Models";

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_key || 'ouaaaaaaaaaaaaa'
        },
        async (jwt_payload, done) => {
            const user = await getRepository(User).findOne({
                where: {
                    id: jwt_payload.data
                }
            });
            return !user ? done(null, false) : done(null, user);
        }
    )
);
