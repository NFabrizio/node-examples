/**
 * favoritesRouter Node module that handles /favorites route
 *
 * A Node file module that handles the /favorites and /favorites/:dishId routes. Sets up an
 * Express Router instance and handles JSON request body with bodyParser. Sets up route 
 * handling for GET, POST and DELETE requests for the /favorites routes and DELETE 
 * requests for the /favorites/:dishId route. Performs the requested action on items
 * in the database for valid requests.
 */

// Add the core packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Require the model file module
var Favorites = require('../models/favorites');
var Verify = require('./verify');

/**
 * Set up the export to perform the requested action for valid requests
 *
 * Starts by setting up the Express Router and telling it to use the bodyParser to parse any
 * JSON objects passed into the route. Sets up handling for the / route, which would actually
 * be /favorites for this application. Handles GET, PUT and DELETE requests for that route 
 * so that data for existing favorites could be retrieved, a new favorite could be added or 
 * all favorites could be deleted. Also handles DELETE requests for the /:dishId route,
 * which would actually be /favorites/:dishId for this application. It handles these so that
 * the specified dishId for an existing favorite will be deleted.  
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
var favoritesRouter = express.Router();
favoritesRouter.use(bodyParser.json());

// Set up rules for the / route
favoritesRouter.route('/')
// Return all favorite documents in the Mongo database for valid GET requests
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
  Favorites.find({})
  // Populate the postedBy and dishes fields in the response based on what was defined in the schema
  .populate('postedBy dishes')
  .exec(function(err, favorite) {
    if(err) {
      throw err; 
    } else {
      res.json(favorite);
    }
  });
})

/**
 * Create a new favorite for valid POST requests
 *
 * This method will first query the Mongo database to see if there is a favorites record for
 * the user. If not, it will create a new favorites record for that user. If there is a
 * record for the user already, it will push the dishId into the existing dishes array.
 */

.post(Verify.verifyOrdinaryUser, function(req, res, next) {
  // Set up some variables to make it easier to reference them
  var dishId = req.body._id;
  var userId = req.decoded._doc._id;

  // Set up an object for insertion into the Mongo database in case that there is no record already
  var favoritesData = {
    postedBy: userId,
    dishes: [dishId]
  };

  // Find favorites records for the user
  Favorites.findOne({ postedBy: userId }, function(err, favorite) {
    if(err) {
      throw err; 
    } else {
      // If there is no record, create one using the favoritesData object
      if(! favorite || favorite.length === 0) {
        Favorites.create(favoritesData, function(err, fav) {
          if(err) {
            throw err; 
          } else {
            console.log("Created favorite!");
            res.json(fav);
          }
        });
      // If there is a favorites record for the user, push the dishId into the dishes array and save changes if the dishId does not already exist in the array
      } else {
        // Check if the dishId already exists in the dishes array
        if(favorite.dishes.indexOf(dishId) > -1) {
          res.json("Dish ID already exists in favorites list!");
        } else {
          favorite.dishes.push(dishId);
          favorite.save(function(err, fav) {
            if(err) {
              throw err; 
            } else {
              console.log("Added favorite!");
              res.json(fav);
            }
          });
        }
      }
    }
  });
})
// Delete all favorites for valid DELETE requests after verifying the user
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
  Favorites.remove({}, function(err, resp) {
    if(err) {
      throw err; 
    } else {
      res.json(resp);
    }
  });
});

// Set up rules for the /:dishId route, where :dishId can be any string passed in the URL
favoritesRouter.route('/:dishId')
// Delete the specified dishId for valid DELETE requests
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
  var dishId = req.params.dishId;
  // Find favorites with a dishes array that contains the specified dishId
  Favorites.findOne({ dishes: dishId }, function(err, fav) {
    if(err) {
      throw err; 
    } else {
      // Remove the specified dishId from the dishes array and save the changes
      fav.dishes.remove(dishId);
      fav.save(function(err, fav) {
        if(err) {
          throw err; 
        } else {
          console.log("Removed favorite!");
          res.json(fav);
        }
      });
    }
  });
});

// Export the appropriate response object
module.exports = favoritesRouter;

