var
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/User.js'),
  MD5 = require('../public/assets/js/md5.js')

// gives user a cookie and initalizes a session
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

// logs user out and ends session for the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

// allows user to signup for new account
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
// requires email and password
  }, function (req, email, password, done) {
    // check to see if user email is unique
    User.findOne({'local.email': email}, function (err, user) {
      if (err) return done(err)
      // if email exits in DB message will flash with signupMessage
      if (user) return done(null, false, req.flash('signupMessage', 'That email is already in use.'))
      var newUser = new User()
      newUser.local.name = req.body.name
      newUser.local.email = email
      // export MD5 package into passport file to MD5(email) and concat string to have image url set in avatar value
      newUser.local.avatar = "http://gravatar.com/avatar/" + MD5(email) + "?s=600"
      newUser.local.password = newUser.generateHash(password)
      // new user is created
      newUser.save(function (err) {
        if (err) return console.log(err);
        return done(null, newUser, null)
      })
    })
  }))

// function for existing user login
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
  // checks for user emails
  User.findOne({'local.email': email}, function (err, user) {
    if (err) return done(err)
    // if no user is found flash login message
    if(!user) return done(null, false, req.flash('loginMessage', 'User not found'))
    // if user is found and password is incoorect, flassh login message
    if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Incorrect password...'))
    return done(null, user)
  })
}))

module.exports = passport
