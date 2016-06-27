var
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  Schema = mongoose.Schema,
  userSchema = new Schema({
    local: {
      name: {type: String, required: true},
      email: {type: String, required: true, unique: true},
      password: String,
      avatar: String,
      location: String,
      bio: String,
      occupation: String,
      age: {type: Number, min: 18},
      height: Number,
      ethnicity: String,
      interestedIn: String
    }
  })


  userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }

  userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password)
  }

  var User = mongoose.model('User', userSchema)

  module.exports = User
