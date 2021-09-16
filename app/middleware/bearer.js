const { User } = require('../models');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const opts = { passReqToCallback: true };

passport.use(
  new BearerStrategy(opts, (req, requestToken, done) => {
    User.findOne({ where : { token : requestToken } })
      .then(token => {
        if(!token){
          return done(null, false, 'Access token invalid');
        }
        done(null, token, 'Token Already!');
      }).catch(err => {
        done(err);
      });
  })
);