const passport = require('passport');

require('./bearer');

function initialize(options) {
  return passport.initialize(options);
}

function authenticateBearer(req, res, next) {
  bearer('bearer', req, res, next);
}

function bearer(name, req, res, next) {
  return passport.authenticate(name, { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(res.status(400));
    }
  })(req, res, next);
}

exports.initialize = initialize;

exports.authenticateBearer = authenticateBearer;