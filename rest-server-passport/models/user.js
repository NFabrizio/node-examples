/**
 * User model
 *
 * Defines the model for the User schema, and uses passport-local-mongoose for setting up
 * username and password with salts and hashes as well as some other useful methods. Also adds a
 * method to get the user first and last name.
 * 
 */

// Require the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Set up the User schema with username and password required, admin status is boolean and false by default
var User = new Schema({
  username: String,
  password: String,
  OauthId: String,
  OauthToken: String,
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  admin: {
    type: Boolean,
    default: false
  }
});

// Set up a method of getting the user first and last name
User.methods.getName = function() {
  return (this.firstname + ' ' + this.lastname);
};

// Tell the app to use passportLocalMongoose for the User schema methods
User.plugin(passportLocalMongoose);

// Export the User schema for external use
module.exports = mongoose.model('User', User);
