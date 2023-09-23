import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import User from "../db/User.js";
import { authKeys } from "./authKeys.js";

const filterJson = (obj, unwantedKeys) => {
    const filteredObj = {};
    Object.keys(obj).forEach((key) => {
      if (unwantedKeys.indexOf(key) === -1) {
        filteredObj[key] = obj[key];
      }
    });
    return filteredObj;
};

passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      (req, email, password, done, res) => {
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {
              message: "User does not exist",
            });
          }
  
          user
            .login(password)
            .then(() => {
              user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
              return done(null, user);
            })
            .catch((err) => {
              return done(err, false, {
                message: "Password is incorrect.",
              });
            });
        });
      }
    )
);
  
passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: authKeys.jwtSecretKey,
      },
      (jwt_payload, done) => {
        User.findById(jwt_payload._id)
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "JWT Token does not exist",
              });
            }
            user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
            return done(null, user);
          })
          .catch((err) => {
            return done(err, false, {
              message: "Incorrect Token",
            });
          });
      }
    )
);
  
export default passport;