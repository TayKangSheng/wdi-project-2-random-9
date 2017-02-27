const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

let UserSchema = new mongoose.Schema({
  local: {
    email: {
      type: String,
      unique: true
    },
    password: String
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
