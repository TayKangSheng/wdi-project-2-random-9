const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

let UserSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
})

UserSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, 10)
}

UserSchema.methods.validPassword = function (givenPassword) {
  return bcrypt.compareSync(givenPassword, this.local.password)
}

let User = mongoose.model('User', UserSchema)

module.exports = User
