import * as passport from 'passport';
import * as FbStrategy from 'passport-facebook-token';
import { Profile } from 'passport-facebook-token';
import { getManager, getRepository } from 'typeorm';
import { ConnectionType, User } from '../Models';

export const FacebookRegister = 'FacebookRegister';

passport.use(
  FacebookRegister,
  new FbStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: any
    ) => {
      let user = await getRepository(User).findOne({
        where: {
          connectionType: ConnectionType.facebook,
          profileID: profile.id,
        },
      });
      if (!user) {
        user = new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          connectionType: ConnectionType.facebook,
          profileID: profile.id,
        });
        // user = new User(
        //   profile.name.givenName,
        //   profile.name.familyName,
        //   profile.emails[0].value
        // );
        // user.connectionType = ConnectionType.facebook;
        // user.profileID = profile.id;
        getManager()
          .save(user)
          .then(() => done(null, user))
          .catch(error => done(error, false));
      } else {
        return done(null, user);
      }
    }
  )
);
