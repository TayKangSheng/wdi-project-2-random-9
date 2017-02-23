require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const logger = require('morgan')
const ejsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const passport = require('passport')

const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(session)

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true})) // get information from HTML forms
app.use(cookieParser()) // read cookies (needed for auth)
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true
  })
}))

// Passport init
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
require('./config/passportConfig')(passport) // pass passport for configuration

// Use connect-flash for flash messages stored in session
app.use(flash())

// set static folder
app.use(express.static('public'))

app.use(methodOverride('_method'))
app.use(logger('dev')) // log every request to the console

// EJS
app.use(ejsLayouts)
app.set('view engine', 'ejs')

// routes
app.use('/photos', require('./routes/photo_router'))
app.use('/users', require('./routes/user_router'))
app.use('/zines', require('./routes/zine_router'))

app.get('/', function (req, res) {
  res.render('homepage')
})

var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Greatness is happening on port ' + port)
})