var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Set up the User schema with username and password required, admin status is boolean and false by default
var User = new Schema({
  username: String,
  password: String,
  admin: {
    type: Boolean,
    default: false
  }
});

// Tell the app to use passportLocalMongoose for the User schema methods
User.plugin(passportLocalMongoose);

// Export the User schema for external use
module.exports = mongoose.model('User', User);
