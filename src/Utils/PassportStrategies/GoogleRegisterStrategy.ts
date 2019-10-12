import { Profile } from 'passport';

const GoogleStrategy = require('passport-google-token').Strategy;
import * as passport from 'passport';
import { getManager, getRepository } from 'typeorm';
import { ConnectionType, User } from '../Models';

export const GoogleRegister = 'GoogleRegister';

passport.use(
  GoogleRegister,
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: any
    ) => {
      let user = await getRepository(User).findOne({
        where: {
          connectionType: ConnectionType.google,
          profileID: profile.id,
        },
      });
      if (!user) {
        user = new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          connectionType: ConnectionType.google,
          profileID: profile.id,
        });
        // user = new User(
        //   profile.name.givenName,
        //   profile.name.familyName,
        //   profile.emails[0].value
        // );
        // user.connectionType = ConnectionType.google;
        // user.profileID = profile.id;
        getManager()
          .save(user)
          .then(() => done(null, user))
          .catch(error => done(error, false));
      } else {
        done(null, user);
      }
    }
  )
);
