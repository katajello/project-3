var
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  PORT = process.env.PORT || 3000


mongoose.connect('mongodb://localhost/chetflix_and_nil', function(err) {
  if (err) throw err;
  console.log('Connected to MongoDB (chetflix_and_nil)')
})

app.listen(PORT, function(err) {
  if (err) throw err;
  console.log('Server listening on port:', PORT)
})
