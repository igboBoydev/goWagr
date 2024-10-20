import { SECRET } from "./";
import Oauth from "../models/Oauth";
import Users from "../models/Users";
import passport from "passport";

import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
var opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

passport.use(
  new JwtStrategy(opts, async (jwt_payload: any, done: any) => {
    console.log({ jwt_payload });
    var checkToken = await Oauth.findOne({
      where: {
        id: jwt_payload.id,
        email: jwt_payload.email,
        iat: jwt_payload.iat,
        exp: jwt_payload.exp,
      },
    });

    console.log({ checkToken });

    if (!checkToken) {
      console.log("No token found");
      return done({ message: "Unathorized" });
    }

    console.log("ooooooooooooooooooo");

    await Users.findOne({ where: { id: jwt_payload.id } })
      .then((user: any) => {
        if (!user) {
          console.log("Kkkkkkkkkkkk");
          return done({ message: "Unathorized" });
        }
        return done(null, user);
      })
      .catch((error: any) => {
        console.log("hhhhhhhhhhh");
        return done({ message: "Unathorized" });
      });
  })
);
