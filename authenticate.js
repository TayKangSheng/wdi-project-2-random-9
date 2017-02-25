const authenticate = {
  isNotLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      req.flash('flash', {
        type: 'danger',
        message: 'Restricted page: Please login'
      })
      res.redirect('/users/login')
    }
  },

  isLoggedIn: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next()
    } else {
      req.flash('flash', {
        type: 'danger',
        message: 'You are already logged in'
      })
      res.redirect('/users/login')
    }
  }
}

module.exports = authenticate
