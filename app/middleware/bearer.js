const { User } = require('../models');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const opts = { passReqToCallback: true };

passport.use(
  new BearerStrategy(opts, async (req, requestToken, done) => {

    let user = await User.findOne({ where : { token : requestToken } });

    if (!user) {
       done(null, false, 'Invalid token');
    }

    req.User = user;

    done(null, true);
  })
);