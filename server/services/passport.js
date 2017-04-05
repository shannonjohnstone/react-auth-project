const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local')
const ExtractJwt = require('passport-jwt').ExtractJwt

// LocalStrategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err, false)}
    if (!user) { return done(null, false) }
    user.comparePassword(password, function(err, isMatch) {
      console.log('compare: ', isMatch);
      if (err) { return done(err) }
      if (!isMatch) { return done(err, false) }
      return done(null, user)
    })
  })
})

// setup jwt options
const jwtOptions = { jwtFromRequest: ExtractJwt.fromHeader('authorization'), secretOrKey: config.secret }

/** jwtLogin - JwtStrategy take jwtOptions, if there is a much from jwtOptions
 * the callback will return a payload, we then use that payload to search for a
 * user, if information is found we return that and if not we return false
 * @param {object} jwtOptions
 * @returns {object} jwt data - in this case users sub information and timestamp
 */
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false) } // err has occuerd

    if (user) { done(null, user) } // found a user
    else { done(null, false) } // no user found
  })
})

// tell passport to use this Strategy
passport.use(jwtLogin)
passport.use(localLogin)
