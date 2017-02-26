let Zine = require('../models/zine')

const zineController = {
  list: function (req, res) {
    if (req.user !== undefined) {
      Zine.find({}, function (err, output) {
        if (err) {
          console.error(err)
          return
        } else {
          res.render('zines/index', {
            loggedInUser: req.user.local.email,
            allZines: output
          })
        }
      })
    } else {
      res.redirect('/users/login')
    }
  },

  new: function (req, res) {
    res.render('zines/create')
  },

  listOne: function (req, res) {
    Zine.findById(req.params.id)
      .populate('photo')
      .exec(function (err, singleZine) {
        console.log(singleZine)
        if (err) {
          console.error(err)
          return
        } else {
          res.render('zines/single_zine', {
            singleZine: singleZine
          })
        }
      })
    // Zine.findById(req.params.id, function (err, singleZine) {
    //   if (err) {
    //     console.error(err)
    //     return
    //   } else {
    //     res.render('zines/single_zine', {
    //       singleZine: singleZine
    //     })
    //   }
    // })
  },

  edit: function (req, res) {
    // req.body is empty object here as form is not filled in yet
    Zine.findById(req.params.id, function (err, singleZine) {
      if (err) {
        console.error(err)
        return
      } else {
        res.render('zines/edit', {
          singleZine: singleZine
        })
      }
    })
  },

  create: function (req, res) {
    let newZine = new Zine({
      name: req.body.title,
      description: req.body.description,
      user: req.user.local.email
    })
    newZine.save(function (err, savedZine) {
      if (err) {
        console.error(err)
        return
      } else {
        res.redirect('/zines')
      }
    })
  },

  update: function (req, res) {
    // req.body.title here is the title user filled in
    // if req.body.title is found in the user's zines, prompt him to rename

    Zine.findOneAndUpdate({
      _id: req.params.id
    }, {
      name: req.body.title,
      description: req.body.description
    }, function (err, zine) {
      if (err) {
        console.error(err)
        return
      } else {
        res.redirect('/zines/' + zine.id)
      }
    }
  )
  },

  delete: function (req, res) {
    Zine.findByIdAndRemove(req.params.id, function (err, deletedZine) {
      if (err) {
        console.error(err)
        return
      } else {
        res.redirect('/zines')
      }
    })
  }
}

module.exports = zineController
