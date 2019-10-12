import * as passport from 'passport';
import * as FbStrategy from 'passport-facebook-token';
import { Profile } from 'passport-facebook-token';
import { getManager, getRepository } from 'typeorm';
import { ConnectionType, User } from '../Models';
import { ApiExceptionTranslate } from '../utils/ApiExceptions/ApiExceptionTranslate';
import { TranslateMessage } from '../utils/Translation/Sentences';

export const FacebookConnection = 'FacebookConnection';

passport.use(
  FacebookConnection,
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
      const user = await getRepository(User).findOne({
        where: {
          connectionType: ConnectionType.facebook,
          profileID: profile.id,
        },
      });
      if (!user) {
        done(
          new ApiExceptionTranslate(403, TranslateMessage.UserNotFound),
          false
        );
      } else {
        return done(null, user);
      }
    }
  )
);
