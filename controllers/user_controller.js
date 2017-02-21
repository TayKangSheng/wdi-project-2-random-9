const User = require('../models/user')

const userController = {
  loginPage: function (req, res) {
    res.render('users/login')
  },

  signupPage: function (req, res) {
    res.render('users/signup')
  }
}

module.exports = userController
