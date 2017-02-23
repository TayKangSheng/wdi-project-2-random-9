let Photo = require('../models/photo')
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
    Photo.findById(req.params.id, function (err, photo) {
      if (err) {
        console.log(err)
        return
      }
      res.render('photos/single_photo', {
        singlePhoto: photo
      })
    })
  },

  create: function (req, res) {
    cloudinary.uploader.upload(req.file.path, function (result) {
      let newPhoto = new Photo({
        title: req.body.title,
        description: req.body.description,
        url: result.url
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
  }
}

module.exports = photoController