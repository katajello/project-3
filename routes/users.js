var
  express = require('express'),
  passport = require('passport'),
  User = require('../models/User.js'),
  Movie = require('../models/Movie.js'),
  userRouter = express.Router()


// root route for home page
userRouter.get('/', function (req, res) {
  User.find({}, function(err, users) {
    if (err) throw err;
    res.render('index', {user: req.user, users: users})
  })
})


userRouter.route('/login')
  .get(function (req, res) {
    res.render('login', {flash: req.flash('loginMessage')})
  })

  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect:'/login'
  }))

userRouter.route('/signup')
  .get(function (req, res) {
    res.render('signup', {flash: req.flash('signupMessage')})
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
  }))

userRouter.route('/users')
.get(function (req, res) {
  User.find({}, function (err, users) {
    if (err) return console.log(err);
    res.json(users)
  })
})

userRouter.route('/users/:id')
  .get(function (req, res) {
    User.findById(req.params.id, function (err, user) {
      if(err) return console.log(err);
      res.json(user)
    })
  })
  .patch(function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, function (err, user) {
      console.log("req.body",req.body);
      if (err) return console.log(err);
      res.redirect('/profile')
    })
  })
  .delete(function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
      if (err) throw err;
      res.json({success: true, user: user})
    })
  })

userRouter.route('/users/:id/movies')
  .get(function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err) throw err;
      res.json(user)
    })
  })
  .post(function(req, res) {
    // first we find the user that made the request
    User.findById(req.params.id, function(err, user) {
      if (err) throw err;
      // then we check to see if the movie exists in the database
      Movie.findOne({"imdbID": req.body.imdbID}, function(err, movie) {
        // if the movie already exists in the database
        if (movie) {
        // link the movie and user and return in a json object
          res.json(addMovie(movie, user))
        }
        else {
          // else create a new movie in the database with the omdbapi data
          var newMovie = new Movie(req.body)
          res.json(addMovie(newMovie, user))
        }
      })
    })
  })

userRouter.get('/profile/edit', isLoggedIn, function(req, res) {
  res.render('edit', {user: req.user})
})

userRouter.route('/users/:id/otherprofile')
.get(function (req, res) {
  User.findById(req.params.id, function(err, user) {
    res.render('otherprofile', {user: user})
  })
})

userRouter.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile', {user: req.user})
})

userRouter.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

userRouter.get('/sign-out', function (req, res) {
  req.logout()
  res.redirect('/')
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

 userRouter.get('/chetflix', function(req, res) {
     res.redirect('/')
   })

function addMovie(movie, user) {
  // add current user to list of users that like that movie
  movie._likedBy.push(user)
  // save the movie
  movie.save(function(err, savedMovie){
    if (err) throw err;
    // add created movie to user's profile
    user.local.movie.push(savedMovie)
    // save user profile
    user.save(function(err, savedUser) {
      if (err) throw err;
      return savedUser
    })
  })
}

module.exports = userRouter
