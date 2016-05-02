/**
 * promoRouter Node module that handles /promotions route
 *
 * A Node file module that handles the /promotions and /promotions/:promoId routes. Sets up an
 * Express Router instance and handles JSON request body with bodyParser. Sets up route
 * handling forGET, POST and DELETE requests for the /promotions route and GET, PUT and DELETE 
 * requests for the/promotions/:promoId route. Currently, not connected to a database, so 
 * returns a message stating what would happen if it were connected to a database, but does not 
 * actually do anything.
 */

// Add the core packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Require the model file module
var Promotions = require('../models/promotions');
var Verify = require('./verify');

/**
 * Set up the export to return a message when run
 *
 * Starts by setting up the Express Router and telling it to use the bodyParser to parse any
 * JSON objects passed into the route. Sets up handling for the / route, which would actually
 * be /promotions for this application. Handles GET, PUT and DELETE requests for that route so
 * that data for existing promotions could be retrieved, a new promotion could be added or all
 * promotions could be deleted. Also handles GET, POST and DELETE requests for the /:promoId
 * route, which would actually be /promotions/:promoId for this application. It handles these
 * so that data for an existing promotion could be retrieved, an existing promotion could be
 * updated or an existing promotion could be deleted. This is set up as an anonymous function
 * that is automatically called so that it can be properly exported in Node, and it returns the
 * promoRouter, which will contains the message for the appropriate route and request method.
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
var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

// Set up rules for the / route
promoRouter.route('/')
// Return all promo documents in the Mongo database for valid GET requests
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
  Promotions.find({}, function(err, promo) {
    if(err) {
      throw err; 
    } else {
      res.json(promo);
    }
  });
})
// Create a new promo for valid POST requests
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Promotions.create(req.body, function(err, promo) {
    if(err) {
      throw err; 
    } else {
      console.log("Promo created!");
      var id = promo._id;
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("Added the promo with id: " + id);
    }
  });
})
// Delete all promotions for valid DELETE requests
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Promotions.remove({}, function(err, resp) {
    if(err) {
      throw err; 
    } else {
      res.json(resp);
    }
  });
});

// Set up rules for the /:promoId route, where :promoId can be any string passed in the URL
promoRouter.route('/:promoId')
// Return the specified promo for valid GET requests
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
  Promotions.findById(req.params.promoId, function(err, promo) {
    if(err) {
      throw err; 
    } else {
      res.json(promo);
    }
  });
})
// Update the specified promo for valid PUT requests
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Promotions.findByIdAndUpdate(req.params.promoId, {
    $set: req.body
  }, {
    new: true
  }, function(err, promo) {
    if(err) {
      throw err; 
    } else {
      res.json(promo);
    }
  });
})
// Delete the specified promo for valid DELETE requests
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Promotions.remove(req.params.promoId, function(err, resp) {
    if(err) {
      throw err; 
    } else {
      res.json(resp);
    }
  });
});

// Export the appropriate response object
module.exports =  promoRouter;

