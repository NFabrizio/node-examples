/**
 * Set up the token creation and verification methods
 *
 * Exports a couple of methods. One to create a new token and force it expire in an hour. Another
 * to verify the token using the secret set in config.js and return either the decoded token or an
 * error.
 *
 * @see sign()
 * @see verify()
 * @see next()
 *
 * @params 
 */
// Set up the required modules
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

// Set the JSON web token to last for one hour
exports.getToken = function(user) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600
  });
}

// Export a function to verify users
exports.verifyOrdinaryUser = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // Decode the token
  if(token) {
    // Verify secret and check expiration
    jwt.verify(token, config.secretKey, function(err, decoded) {
      if(err) {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        return next(err);
      } else {
        // If everything is verified, save the request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // If there is no token, return an error
    var err = new Error('No token provided!');
    err.status = 403;
    return next(err);
  }
}

// Export a function to verify users
exports.verifyAdmin = function(req, res, next) {

  // Set up variable the value of admin for the user
//  var isAdmin = req.decoded._doc.admin;

  // Decode the token
  if(req.decoded._doc.admin === false) {
    // If user is not an admin, throw an error
    var err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    return next(err);
  } else {
    // If user is an admin, continue
    next();
  }
}
