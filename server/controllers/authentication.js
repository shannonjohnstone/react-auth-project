const jwt = require('jwt-simple')
const config = require('../config')
const User = require('../models/user')

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signup = function(req, res, next) {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err)} // err

    // either email or password not provided
    if (!email || !password) { return res.status(422).send({ err: 'You must provide an email and password' }) }

    // user already exist
    if (existingUser) { return res.status(422).send({ err: 'Email is already in use. '}) }

    // create and save new user
    const user = new User({ email: email, password: password }) // create in memort user
    user.save(function(err) { // save user to the db
      if (err) { return next(err) }
      res.send({ token: tokenForUser(user) }) // return success message
    })
  })
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) })
}
