var
  express = require('express'),
  passport = require('passport'),
  User = require('../models/User.js'),
  userRouter = express.Router()

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
      User.findByIdAndUpdate(req.params.id, {local:req.body}, {new:true}, function (err, user) {
        if (err) return console.log(err);
        res.json({success:true, message:"User Updated", user: user})
        // res.json(req.params.id)
      })
    })



userRouter.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile', {user: req.user})
})

userRouter.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = userRouter
