import { Profile } from 'passport';

const GoogleStrategy = require('passport-google-token').Strategy;
import * as passport from 'passport';
import { getManager, getRepository } from 'typeorm';
import { ConnectionType, User } from '../Models';
import { ApiExceptionTranslate } from '../utils/ApiExceptions/ApiExceptionTranslate';
import { TranslateMessage } from '../utils/Translation/Sentences';

export const GoogleConnection = 'GoogleConnection';

passport.use(
  GoogleConnection,
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
      const user = await getRepository(User).findOne({
        where: {
          connectionType: ConnectionType.google,
          profileID: profile.id,
        },
      });
      if (!user) {
        done(new ApiExceptionTranslate(403, TranslateMessage.UserNotFound));
      } else {
        done(null, user);
      }
    }
  )
);
