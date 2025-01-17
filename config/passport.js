require("dotenv").config();
const db = require("../db/queries");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (jwt_payload, done) => {
      try {
        const user = await db.getUserById(jwt_payload.user.id);
        if (!user) {
          return done(null, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
