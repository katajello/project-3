var
express = require('express')
movieRouter = express.Router()


movieRouter.route('/search')
     .get(function (req, res) {
       res.render('search')
     })

movieRouter.route("/info/:id")
    .get(function(req, res) {
      res.render('info', {imdb: req.params.id})
    })

// app.get('/search', function(req, res) {
// ApiUrl = "http://www.omdbapi.com/?t=" + req.query.t
//
//   request(apiUrl, function(err, response) {
//     if(err) return console.log(err)
//     res.json(JSON.parse(response.body))
//   })
module.exports = movieRouter
