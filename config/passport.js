var
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/User.js')

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({'local.email': email}, function (err, user) {
      if (err) return done(err)
      if (user) return done(null, false, req.flash('signupMessage', 'That email is already in use.'))
      var newUser = new User()
      newUser.local.name = req.body.name
      newUser.local.email = email
      // export MD5 package into passport file to MD5(email) and concat string to have image url
      newUser.local.password = newUser.generateHash(password)

      newUser.save(function (err) {
        if (err) return console.log(err);
        return done(null, newUser, null)
      })
    })
  }))

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
  User.findOne({'local.email': email}, function (err, user) {
    if (err) return done(err)
    if(!user) return done(null, false, req.flash('loginMessage', 'User not found'))
    if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Incorrect password...'))
    return done(null, user)
  })
}))

module.exports = passport
