var
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  userSchema = new Schema({
    local: {
      name: String,
      email: String,
      password: String
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
