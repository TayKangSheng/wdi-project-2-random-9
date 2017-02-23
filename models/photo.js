const mongoose = require('mongoose')

let photoSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  user: String
  // user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

let Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo
