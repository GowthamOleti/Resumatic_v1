import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';

export function configurePassport() {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          fullname: profile.displayName,
          email,
          googleId: profile.id
        });
      }

      const accessT = user.generateAccessToken();
      const refreshT = user.generateRefreshToken();
      user.refreshToken = refreshT;
      await user.save({ validateBeforeSave: false });

      return done(null, { user, accessT, refreshT });
    } catch (err) {
      return done(err, null);
    }
  }));
}