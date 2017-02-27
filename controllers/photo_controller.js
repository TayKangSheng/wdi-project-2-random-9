let Photo = require('../models/photo')
let Zine = require('../models/zine')
const mongoose = require('mongoose')

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
    console.log(req.file);
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
    // console.log(req.body);
    Zine.find({user: req.user.local.email}, function (err, zine) {
      // console.log(zine);
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
  },

  addToNewZine: function (req, res) {
    res.render('photos/create_zine', {
      photo: req.params.id
    })
  },

  updateZine: function (req, res) {
    // console.log(typeof req.body.id)
    if(typeof req.body.id === "object") {
      req.body.id.forEach(function (zineId) {
        Zine.findOneAndUpdate({_id: zineId},
          { $push: { photo: req.params.id }}, function (err, output) {
            if (err) {
              console.error(err)
              return
            } else {
              console.log('pushed id into zine')
            }
          })
        })
    } else {
      Zine.findOneAndUpdate({_id: req.body.id},
        { $push: { photo: req.params.id }}, function (err, output) {
          if (err) {
            console.error(err)
            return
          } else {
            console.log('pushed id into zine')
          }
        })
    }
    res.redirect('/photos')
    // Zine.findOneAndUpdate({name: req.body.name},
    //   { $push: { photo: req.params.id }}, function (err, output) {
    //     if (err) {
    //       console.error(err)
    //       return
    //     } else {
    //       res.redirect('/photos')
    //     }
    //   })
  },

  newZine: function (req, res) {
    let newZine = new Zine({
      name: req.body.title,
      description: req.body.description,
      user: req.user.local.email
    })
    // console.log(req.params.id);
    // console.log(mongoose.Types.ObjectId(req.params.id));
    newZine.photo.push(
      mongoose.Types.ObjectId(req.params.id)
    )
    newZine.save(function (err, zine) {
      if (err) {
        console.error(err)
        return
      } else {
        res.redirect('/zines/' + zine.id)
      }
    })
  }

}

module.exports = photoController
