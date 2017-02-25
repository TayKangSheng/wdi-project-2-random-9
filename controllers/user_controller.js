const User = require('../models/user')
const passport = require('passport')

const userController = {
  loginPage: function (req, res) {
    res.render('users/login', {
      flash: req.flash('flash')[0]
    })
  },

  signupPage: function (req, res) {
    res.render('users/signup', {
      flash: req.flash('flash')[0]
    })
  },

  signup: function (req, res) {
    var signUpStrategy = passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/users/signup',
      failureFlash: true // true in order for req.flash to display
    })
    return signUpStrategy(req, res)
  },

  login: function (req, res) {
    var loginStrategy = passport.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
    })
    return loginStrategy(req, res)
  },

  logout: function (req, res) {
    req.logout()
    res.redirect('/')
  },

  profile: function (req, res) {
    res.render('users/profile', {
      user: req.user
    })
  }
}

module.exports = userController
