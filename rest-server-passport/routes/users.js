var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

// Set up user get route to only be accessible by an admin
router.route('/')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  User.find({}, function(err, user) {
    if(err) {
      throw err; 
    } else {
      res.json(user);
    }});
});

// Set up the user registration route
router.post('/register', function(req, res) {
  // Register a new user with username and password
  User.register(new User({ username: req.body.username }),
  req.body.password, function(err, user) {
    // If an error occurs, return the error with a status of 500
    if(err) {
      return res.status(500).json({ err: err });

    // If successful, send a success message with status of 200
    } else {
      // Check if there is a firstname and lastname in the request and if so, add them to the user object
      if(req.body.firstname) {
        user.firstname = req.body.firstname;
      }
      if(req.body.lastname) {
        user.lastname = req.body.lastname;
      }
      // Save the changes to the user object
      user.save(function(err, user) {
        passport.authenticate('local')(req, res, function() {
          return res.status(200).json({ status: 'Registration successful!' });
        });
      });
    }
  });
});

// Set up the user login route
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if(err) {
      return next(err);
    } else if (! user) {
      return res.status(401).json({
        err: info
      });
    } else {
      req.logIn(user, function(err) {
        if(err) {
          return res.status(500).json({
            err: 'Could not log user in'
          });
        } else {
          console.log('User in users: ', user);

          var token = Verify.getToken(user);

          // Upon successful login, send a token for future use
          res.status(200).json({
            status: 'Login successful!',
            success: true,
            token: token
          });
        }
      });
    }
  })(req, res, next);
});

// Set up the logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = router;
