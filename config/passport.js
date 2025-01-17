require("dotenv").config();
const db = require("../db/queries");
const passport = require("passport");
const pool = require("../db/pool");
const GoogleStrategy = require("passport-google-oidc");
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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
      scope: ["profile"],
    },
    async function verify(issuer, profile, cb) {
      console.log("usaooo");

      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE google_id = $1",
          [profile.id]
        );

        let user = rows[0];

        if (!user) {
          const newUser = await pool.query(
            "INSERT INTO users (user_name, google_id) VALUES ($1, $2) RETURNING *",
            [profile.displayName, profile.id]
          );
          console.log("dodaje usera u bazu");

          user = newUser.rows[0];
        }

        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);
