import { User } from '@prisma/client';
import passport from 'passport';

import { prisma } from '~/common/prisma';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GoogleStrategy = require('passport-google-oauth2');

interface GoogleProfileResponse {
  provider: string;
  id: string;
  displayName: string;
  email: string;
  picture: string;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      passReqToCallback: true,
    },
    async (
      request: unknown,
      accessToken: string,
      refreshToken: unknown,
      profile: GoogleProfileResponse,
      done: (err: unknown, user: User | null) => void
    ) => {
      try {
        const user = await prisma.user.findUnique({ where: { id: profile.id } });
        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              id: profile.id,
              username: profile.displayName,
              nickname: profile.displayName,
              email: profile.email,
              avatar: profile.picture,
            },
          });
          console.log('Stworzono nowego usera w DB: ' + newUser.nickname);
          done(null, newUser);
        } else {
          console.log('User był w bazie: ' + user.nickname);
          done(null, user);
        }
      } catch (err) {
        console.log('error: ' + err);
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: User, done) => {
  done(null, user);
});
