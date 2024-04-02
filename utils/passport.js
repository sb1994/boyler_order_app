const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      // console.log(secretOrKey)

      try {
        const user = await User.findById(jwt_payload._id).select("-password");

        user ? done(null, user) : done(null, false);
      } catch (error) {
        console.log(error);
      }
    })
  );
};
