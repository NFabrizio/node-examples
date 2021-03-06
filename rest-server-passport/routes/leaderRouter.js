/**
 * leaderRouter Node module that handles /leadership route
 *
 * A Node file module that handles the /leadership and /leadership/:leaderId routes. Sets up an
 * Express Router instance and handles JSON request body with bodyParser. Sets up route
 * handling for GET, POST and DELETE requests for the /leadership route and GET, PUT and DELETE 
 * requests for the /leadership/:leaderId route. Currently, not connected to a database, so
 * returns a message stating what would happen if it were connected to a database, but does not 
 * actually do anything.
 */

// Add the core packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Require the model file module
var Leaders = require('../models/leadership');
var Verify = require('./verify');

/**
 * Set up the export to return a message when run
 *
 * Starts by setting up the Express Router and telling it to use the bodyParser to parse any
 * JSON objects passed into the route. Sets up handling for the / route, which would actually
 * be /leadership for this application. Handles GET, PUT and DELETE requests for that route so
 * that data for existing leaders could be retrieved, a new leader could be added or all leaders
 * could be deleted. Also handles GET, POST and DELETE requests for the /:leaderId route, which
 * would actually be /leadership/:leaderId for this application. It handles these so that data for
 * an existing leader could be retrieved, an existing leader could be updated or an existing
 * leader could be deleted. This is set up as an anonymous function
 * that is automatically called so that it can be properly exported in Node, and it returns the
 * leaderRouter, which will contains the message for the appropriate route and request method.
 *
 * @see express.Router()
 * @see bodyParser.json()
 * @see use()
 * @see route()
 * @see all()
 * @see get()
 * @see put()
 * @see delete()
 * @see post()
 * @see next()
 * @see writeHead()
 * @see end()
 * @see write()
 *
 * @params Object $req {
 *      Request sent to the endpoint
 *         
 *      @type Array $params URL parameters included with request.
 *      @type Object $body JSON object sent in the body of the request.
 * }
 * @params Object $res {
 *      Response returned from the server
 *
 *      @type Object $headers Response headers.
 *      @type Object $body JSON or XML body response containing requested information or error.
 * }
 * @params $next
 *
 * @return Object The server response with either the content or error message.
 */

// Declare the express router and tell it to use the bodyPaser
var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

// Set up rules for the / route
leaderRouter.route('/')
// Return all leader documents in the Mongo database for valid GET requests
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
  Leaders.find({}, function(err, leader) {
    if(err) {
      throw err; 
    } else {
      res.json(leader);
    }
  });
})
// Create a new leader for valid POST requests
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Leaders.create(req.body, function(err, leader) {
    if(err) {
      throw err; 
    } else {
      console.log("Leader created!");
      var id = leader._id;
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("Added the leader with id: " + id);
    }
  });
})
// Delete all leaders for valid DELETE requests
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Leaders.remove({}, function(err, resp) {
    if(err) {
      throw err; 
    } else {
      res.json(resp);
    }
  });
});

// Set up rules for the /:leaderId route, where :leaderId can be any string passed in the URL
leaderRouter.route('/:leaderId')
// Return the specified leader for valid GET requests
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
  Leaders.findById(req.params.leaderId, function(err, leader) {
    if(err) {
      throw err; 
    } else {
      res.json(leader);
    }
  });
})
// Update the specified leader for valid PUT requests
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Leaders.findByIdAndUpdate(req.params.leaderId, {
    $set: req.body
  }, {
    new: true
  }, function(err, leader) {
    if(err) {
      throw err; 
    } else {
      res.json(leader);
    }
  });
})
// Delete the specified leader for valid DELETE requests
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Leaders.remove(req.params.leaderId, function(err, resp) {
    if(err) {
      throw err; 
    } else {
      res.json(resp);
    }
  });
});

// Export the appropriate response object
module.exports =  leaderRouter;

