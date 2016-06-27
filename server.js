var
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  request = require('request'),
  PORT = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/chetflix_and_nil', function(err) {
  if (err) throw err;
  console.log('Connected to MongoDB (chetflix_and_nil)')
})



app.get('/search', function(req, res) {
  var ApiUrl = "http://www.omdbapi.com/?s=" + req.query.t;

  request(apiUrl, function(err, response) {
    if(err) return console.log(err);
    res.json(JSON.parse(response.body))
  })
})



// app.get('/', function(req, res) {
//   res.
//   json({Success: true, message: 'Welcome to the home page!'})
// })


app.listen(PORT, function(err) {
  if (err) throw err;
  console.log('Server listening on port:', PORT)
})
