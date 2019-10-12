import * as bcrypt from 'bcryptjs';
import * as passport from 'koa-passport';
import * as passportLocal from 'passport-local';
import { getRepository} from "typeorm";
import { User } from "../../Models";

const LocalStrategies = passportLocal.Strategy;

export function verifyPassword(password: string, user: User) {
 return bcrypt.compareSync(password, user.password);
}

// const fetchUser = => {
//
//     const user = getRepository(User).findOne({
//         where: {
//             email: email.toLowerCase()
//         }
//     });return async function() {
//         return user
//     }
// })();

passport.serializeUser(function(user, done) {
    done(null, user.id)
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await getRepository(User).findOne({
            where: {
                id: id
            }
        });
        done(null, user)
    } catch(err) {
        done(err)
    }
});

passport.use(new LocalStrategies(
    {
        usernameField: 'email',
        session: false
    },
    async (email: string, password: string, done: any) => {
        const user = await getRepository(User).findOne({
            where: {
                email: email.toLowerCase()
            }
        });

        if (!user) {
            return done(null, false
                // new ApiExceptionTranslate(404, TranslateMessage.UserNotFound), false
            );
        }
        if (verifyPassword(password, user)) {
            return done(null, user);
        }
        return done(null, false
            // new ApiExceptionTranslate(403, TranslateMessage.WrongPassword), false
        )
    }
));
