const mongoose = require('mongoose')
// const Photo = require('./photo')
// var Photo = mongoose.model('Photo')

let zineSchema = new mongoose.Schema({
  name: String,
  description: String,
  photo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
  user: String
})

// console.log(Photo.schema.obj.url)

let Zine = mongoose.model('Zine', zineSchema)

// console.log(Zine);
module.exports = Zine
