var
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  express = require('express'),
  app = express(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  flash = require('connect-flash'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  methodOverride = require('method-override'),
  session = require ('express-session'),
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  userRoutes = require('./routes/users.js'),
  movieRoutes = require('./routes/movies.js'),
  cors = require('cors')

  PORT = process.env.PORT || 3000

// Connects to the local database for testing purposes
mongoose.connect('mongodb://localhost/netflix_and_chill', function(err) {
  if (err) throw err;
  console.log('Connected to MongoDB (Love Scene)')
})

//CORS middleware
app.use(cors())
app.use(function (req, res, next) {
   res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
   res.header('Pragma', 'no-cache');
   res.header('Expires', 0 );
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   if (req.method === 'Options') {
     res.send(200);
   } else {
     return next();
   }
 })
// Application-wide middleware
// logger for debugging
app.use(logger('dev'))
// parses cookies for session info and staying logged in
app.use(cookieParser())
// parses data for for submitting json objects
app.use(bodyParser.json())
// parses data for submitting form data
app.use(bodyParser.urlencoded({extended: false}))
// overrides POST request in edit form to be viewed as patch request
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

// establishes the public folder for assets
app.use(express.static('public'))

// sets ejs as the view engine
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// establishes session settings to keep users logged in
app.use(session ({
  cookie: {_expires:60000000},
  secret: "chill",
  resave: true,
  saveUninitialized: false
}))

// middleware for logging in and verifying users
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// new middleware?
app.use(function(req, res, next){
    res.locals.currentUser = req.user
    res.locals.isLoggedIn = !!req.user
    next()
})

// router for user routes
app.use('/', userRoutes)

// router for movie routes
app.use('/', movieRoutes)
app.use('/search', movieRoutes)


// starts the server listening on either port 3000 or process.env.PORT
app.listen(PORT, function(err) {
  if (err) throw err;
  console.log('Server listening on port:', PORT)
})
