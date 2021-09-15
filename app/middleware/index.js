const passport = require('passport');

require('./bearer');

function initialize(options) {
  return passport.initialize(options);
}

function authenticateBearer(req, res, next) {
  bearer('bearer', req, res, next);
}

exports.initialize = initialize;

exports.authenticateBearer = passport.authenticate(['bearer'], { session: false });