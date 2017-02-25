var LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = function (passport) {
  // determines which data of the user object should be stored in session
  // in this case, we use user.id as the key
  // the result of serializeUser is attached to the session as req.session.passport.user = {}
  // in this case, it is req.session.passport.user = {id: 'xxx'}
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })
  // first argument of deserializeUser corresponds to the key specified above
  // deserializeUser matches the key with that in the database to retrieve req.session.passport.user
  // req.session.passport.user is then attached to req object -> req.user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the cb
  }, function (req, email, password, done) {
    User.findOne({ 'local.email': email }, function (err, user) {
      if (err) return done(err)
      if (user) {
        return done(null, false, req.flash('flash', {
          type: 'warning',
          message: 'This email is already taken'
        }))
      } else {
        let newUser = new User({
          local: {
            email: email,
            password: User.encrypt(password)
          }
        })
        newUser.save(function (err, output) {
          if (err) throw err
          return done(null, output, req.flash('flash', {
            type: 'success',
            message: 'Hello new user ' + output.local.email
          }))
        })
      }
    })
  })),

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    // In passport authentication, theres only 3 case
    // case1: error => done(err)
    // case2: success => done(null, output)
    // case3: fail => done(null, false)
    User.findOne({ 'local.email': email }, function (err, user) {
      if (err) return done(err)
      if (!user) {
        return done(null, false, req.flash('flash', {
          type: 'warning',
          message: 'No user found by this email'
        }))
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('flash', {
          type: 'danger',
          message: 'Access Denied: Password is wrong'
        }))
      }
      // return successful user
      return done(null, user, req.flash('flash', {
        type: 'success',
        message: 'You have successfully logged in'
      }))
    })
  }))
}
