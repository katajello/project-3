var
  express = require('express'),
  Movie = require('../models/Movie.js'),
  User = require('../models/User.js'),
  movieRouter = express.Router()


movieRouter.route('/search')
     .get(function (req, res) {
       res.render('search', {user: req.user})
     })

movieRouter.route("/info/:id")
    .get(function(req, res) {
      res.render('info', {imdb: req.params.id})
    })

// on display of movies, check current user's movies to see if they liked anything with the same imdbID
// if they click on one they don't have, check to see if that movie exists in database, then add it to that user and add user to liked_by
// if movie doesnt exist in database, add it and add the current_user to the liked_by
// don't


// app.get('/search', function(req, res) {
// ApiUrl = "http://www.omdbapi.com/?t=" + req.query.t
//
//   request(apiUrl, function(err, response) {
//     if(err) return console.log(err)
//     res.json(JSON.parse(response.body))
//   })
module.exports = movieRouter
