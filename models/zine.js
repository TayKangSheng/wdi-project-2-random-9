const mongoose = require('mongoose')

var Photo = mongoose.model('Photo')

let zineSchema = new mongoose.Schema({
  name: String,
  description: String,
  url: [Photo.schema]
})

let Zine = mongoose.model('Zine', zineSchema)

module.exports = Zine
