let Photo = require('../models/photo')

const multer = require('multer')
const upload = multer({ dest: './uploads/'})

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
    let newPhoto = new Photo({
      title: req.body.title,
      description: req.body.description,
      url: req.body.url
    })
    newPhoto.save(function (err, savedPhoto) {
      if (err) {
        console.error(err)
        return
      } else {
        console.log(savedPhoto)
        res.redirect('/photos')
      }
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
    Photo.findOneAndUpdate({
      _id: req.params.id
    }, {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url
    }, function (err, photo) {
      if (err) {
        console.error(err)
        return
      } else {
        res.redirect('/photos/' + photo.id)
      }
    })
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
