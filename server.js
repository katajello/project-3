var
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  var PORT = process.env.PORT || 3000;

  mongoose.connect('mongodb://localhost/project-3', function(err) {
  	if(err) return console.log(err)
  	console.log("Connected to MongoDB (project-3)")
  })

  app.get('/chetflixsandbil/:id', function(req, res) {
    var apiUrl = "http://pokeapi.co/api/v2/pokemon/" + req.params.id

    request(apiUrl, function(err, response) {
      // var image = JSON.parse(response.body).data
      var data = JSON.parse(response.body)
      var pokemon = {
        name: data.name,
        weight: data.weight,
        height: data.height,
        base_experience: data.base_experience
      }

      res.json(pokemon)
    })
  })

  app.listen(PORT, function() {
    console.log('Server is runing on port 3000')
  })
