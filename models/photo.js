const mongoose = require('mongoose')

let photoSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String
})

let Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo
