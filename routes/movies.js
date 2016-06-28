var
express = require('express')
movieRouter = express.Router()


movieRouter.route('/search')
     .get(function (req, res) {
       res.render('search')
     })


// app.get('/search', function(req, res) {
//   // var ApiUrl = "https://www.themoviedb.org/search?query=" + req.params.id;
//   var ApiUrl = "http://www.omdbapi.com/?t=" + req.query.t;
//
//   request(apiUrl, function(err, response) {
//     if(err) return console.log(err);
//     res.json(JSON.parse(response.body))
//   })
module.exports = movieRouter
