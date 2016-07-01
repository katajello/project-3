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
      height: String,
      ethnicity: String,
      interestedIn: String,
      gender: String,
      movie: [{type: Schema.Types.ObjectId, ref: 'Movie'}]
    }
  })

// encrypts users password 8 times
  userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }
// decrypts users password
  userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password)
  }

  var User = mongoose.model('User', userSchema)

  module.exports = User
