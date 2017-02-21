const express = require('express')
const app = express()
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/photos')
mongoose.Promise = global.Promise

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true}))

app.use(ejsLayouts)

app.set('view engine', 'ejs')

app.use('/photos', require('./routes/photo_router'))
app.use('/users', require('./routes/user_router'))

app.get('/', function (req, res) {
  res.render('homepage')
})

app.listen(3000, function () {
  console.log('App is running on port 3000')
})
