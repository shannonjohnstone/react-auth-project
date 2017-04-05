const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const userSchema = Schema({ email: { type: String, unique: true, lowercase: true }, password: String })

userSchema.pre('save', function(next) {
  const user = this
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      user.password = hash
      next()
    })
  })
})

/** .compare takes in a password and compares it with the salted password and returns if isMatch
 * @param {string} candidatePassword
 */
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  console.log('candidatePassword: ', candidatePassword);
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err) }

    cb(null, isMatch)
  })
}

const ModelClass = mongoose.model('User', userSchema)

module.exports = ModelClass
