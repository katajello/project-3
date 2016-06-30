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
      Movie.findOne({"imdbID": req.imdbID}, function(err, movie) {
        if (movie) res.json({message: "Movie Found!"})
        else res.json({message: 'No Movie Found!'})
      })
      // if it doesnt exist, we save it to the database
      // we then push the movie to the user movies key and save the user to the movie _likedBy
      // we then return the movie that was saved as a json object
    })
  })

userRouter.route('/users/:id/edit')
  .get(function (req, res) {
    User.findById(req.params.id, function(err, user) {
      // console.log('user.local.bio.toString',user.local.bio.toString);
      // console.log('String(user.local.bio)',String(user.local.bio));
      res.render('edit', {user:user})
    })
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




module.exports = userRouter
