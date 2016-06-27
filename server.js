var
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  express = require('express'),
  app = express(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  flash = require('connect-flash'),
  logger = require('morgan'),
  // request = require('request'),
  cookieParser = require('cookie-parser'),
  session = require ('express-session'),
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  userRoutes = require('./routes/users.js'),
  PORT = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/chetflix_and_nil', function(err) {
  if (err) throw err;
  console.log('Connected to MongoDB (chetflix_and_nil)')
})




app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.use(session ({
  cookie: {_expires:60000000},
  secret: "chill",
  resave: true,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.get('/', function (req, res) {
  res.render('index')

})

app.use('/', userRoutes)



app.listen(PORT, function(err) {
  if (err) throw err;
  console.log('Server listening on port:', PORT)
})
