// var
//   express = require('express')
//   movieRouter = express.Router()
//
//   movieRouter.get('/movies', function(req, res) {
//       User.find({}, function(error, movies){
//         res.json(movies)
//       })
//     })
app.get('/search', function(req, res) {
  var ApiUrl = "http://www.omdbapi.com/?s=" + req.query.t;

  request(apiUrl, function(err, response) {
    if(err) return console.log(err);
    res.json(JSON.parse(response.body))
  })
