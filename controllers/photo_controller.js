let Photo = require('../models/photo')
let Zine = require('../models/zine')

const cloudinary = require('cloudinary')

const photoController = {
  list: function (req, res) {
    Photo.find({}, function (err, output) {
      if (err) {
        console.error(err)
        return
      } else {
        res.render('photos/index', {
          photos: output
        })
      }
    })
  },

  new: function (req, res) {
    res.render('photos/create')
  },

  listOne: function (req, res) {
    // console.log(req.user)
    // var userEmail = req.user.local.email
    Photo.findById(req.params.id, function (err, photo) {
      if (err) {
        console.log(err)
        return
      }
      Zine.find({user: req.user.local.email}, function (err, zine) {
        if (err) {
          console.error(err)
          return
        } else {
          res.render('photos/single_photo', {
            isCreator: (photo.user === req.user.local.email),
            singlePhoto: photo,
            zine: zine
          })
        }
      })
    })
  },

  create: function (req, res) {
    cloudinary.uploader.upload(req.file.path, function (result) {
      let newPhoto = new Photo({
        title: req.body.title,
        description: req.body.description,
        url: result.url,
        user: req.user.local.email
      })
      newPhoto.save(function (err, savedPhoto) {
        if (err) {
          console.error(err)
          return
        } else {
          res.redirect('/photos')
        }
      })
    })
  },

  edit: function (req, res) {
    Photo.findById(req.params.id, function (err, singlePhoto) {
      if (err) {
        console.error(err)
        return
      } else {
        res.render('photos/edit', {
          singlePhoto: singlePhoto
        })
      }
    })
  },

  update: function (req, res) {
    if (req.file) {
      cloudinary.uploader.upload(req.file.path, function (result) {
        Photo.findOneAndUpdate({
          _id: req.params.id
        }, {
          title: req.body.title,
          description: req.body.description,
          url: result.url
        }, function (err, photo) {
          if (err) {
            console.error(err)
            return
          } else {
            res.redirect('/photos/' + photo.id)
          }
        }
      )
      })
    } else {
      Photo.findOneAndUpdate({
        _id: req.params.id
      }, {
        title: req.body.title,
        description: req.body.description
      }, function (err, photo) {
        if (err) {
          console.error(err)
          return
        } else {
          res.redirect('/photos/' + photo.id)
        }
      })
    }
  },

  delete: function (req, res) {
    Photo.findByIdAndRemove(req.params.id, function (err, photo) {
      if (err) {
        console.error(err)
        return
      } else {
        res.redirect('/photos')
      }
    })
  },

  addToExistingZine: function (req, res) {
    // console.log(req.params.id);
    // Photo.findById(req.params.id, function (err, photo) {
      // if (err) {
      //   console.error(err)
      //   return
      // } else {
        Zine.find({user: req.user.local.email}, function (err, zine) {
          if (err) {
            console.error(err)
            return
          } else {
            res.render('photos/show', {
              zine: zine,
              photo: req.params.id
            })
          }
        })
      // }
    // })
  },

  addToNewZine: function (req, res) {
    res.render('zines/create')
  },

  updateZine: function (req, res) {
    console.log(req.user.local.email)
    // console.log(req.params.id)
    console.log(req.query)
    Zine.findOneAndUpdate({user: req.user.local.email},
      { $push: { photo: req.params.id }}, function (err, output) {
        if (err) {
          console.error(err)
          return
        } else {
          res.redirect('/zines/' + output.id)
        }
      })
  }

}

module.exports = photoController
