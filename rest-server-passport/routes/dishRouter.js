/**
 * dishRouter Node module that handles /dishes route
 *
 * A Node file module that handles the /dishes, /dishes/:dishId, /dishes/:dishId/comments and 
 * /dishes/:dishId/comments/:commentId routes. Sets up an Express Router instance and handles
 * JSON request body with bodyParser. Sets up route handling for GET, POST and DELETE requests
 * for the /dishes and /dishes/:dishId/comments routes and GET, PUT and DELETE requests for the
 * /dishes/:dishId and /dishes/:dishId/comments/:commentId routes. Performs the requested action
 * on items in the database for valid requests.
 */

// Add the core packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Require the model file module
var Dishes = require('../models/dishes');
var Verify = require('./verify');

/**
 * Set up the export to perform the requested action for valid requests
 *
 * Starts by setting up the Express Router and telling it to use the bodyParser to parse any
 * JSON objects passed into the route. Sets up handling for the / route, which would actually
 * be /dishes for this application. Handles GET, PUT and DELETE requests for that route so that
 * data for existing dishes could be retrieved, a new dish could be added or all dishes could be
 * deleted and does the same for the  and /dishes/:dishId/comments route. Also handles GET, POST
 * and DELETE requests for the /:dishId and /:dishId/comments/:commentId route, which would
 * actually be /dishes/:dishId and /dishes/:dishId/comments/:commentId for this application. It
 * handles these so that data for an existing dish or comment is retrieved, an existing dish or
 * comment could be updated or an existing dish or comment could be deleted.  
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
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

// Set up rules for the / route
dishRouter.route('/')
// Return all dish documents in the Mongo database for valid GET requests
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
  Dishes.find({})
  .populate('comments.postedBy')
  .exec(function(err, dish) {
    if(err) {
      throw err; 
    } else {
      res.json(dish);
    }
  });
})
// Create a new dish for valid POST requests
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Dishes.create(req.body, function(err, dish) {
    if(err) {
      throw err; 
    } else {
      console.log("Dish created!");
      var id = dish._id;
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("Added the dish with id: " + id);
    }
  });
})
// Delete all dishes for valid DELETE requests after verifying the user
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Dishes.remove({}, function(err, resp) {
    if(err) {
      throw err; 
    } else {
      res.json(resp);
    }
  });
});

// Set up rules for the /:dishId route, where :dishId can be any string passed in the URL
dishRouter.route('/:dishId')
// Return the specified dish for valid GET requests
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
  Dishes.findById(req.params.dishId)
  .populate('comments.postedBy')
  .exec(function(err, dish) {
    if(err) {
      throw err; 
    } else {
      res.json(dish);
    }
  });
})
// Update the specified dish for valid PUT requests
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Dishes.findByIdAndUpdate(req.params.dishId, {
    $set: req.body
  }, {
    new: true
  }, function(err, dish) {
    if(err) {
      throw err; 
    } else {
      res.json(dish);
    }
  });
})
// Delete the specified dish for valid DELETE requests
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Dishes.remove(req.params.dishId, function(err, resp) {
    if(err) {
      throw err; 
    } else {
      res.json(resp);
    }
  });
});

// Set up rules for the /:dishId/comments route, where :dishId can be any string passed in the URL
dishRouter.route('/:dishId/comments')
.all(Verify.verifyOrdinaryUser)
// Return the comments for the specified dish for valid GET requests
.get(function(req, res, next) {
  Dishes.findById(req.params.dishId)
  .populate('comments.postedBy')
  .exec(function(err, dish) {
    if(err) {
      throw err; 
    } else {
      res.json(dish.comments);
    }
  });
})
// Add comments for the specified dish for valid POST requests
.post(function(req, res, next) {
  Dishes.findById(req.params.dishId, function(err, dish) {
    if(err) {
      throw err; 
    } else {
      // Set up the variable with the user record id
      req.body.postedBy = req.decoded._doc._id;
      dish.comments.push(req.body);
      dish.save(function(err, dish) {
      if(err) {
        throw err; 
      } else {
        console.log("Updated dish!");
        res.json(dish);
      }});
    }
  });
})
// Delete all comments for the specified dish for valid DELETE requests
.delete(Verify.verifyAdmin, function(req, res, next) {
  Dishes.findById(req.params.dishId, function(err, dish) {
    if(err) {
      throw err; 
    } else {
      for(var i = (dish.comments.length -1); i >= 0; i--) {
        dish.comments.id(dish.comments[i]._id).remove();
      }
      dish.save(function(err, result) {
      if(err) {
        throw err; 
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Deleted all comments!");
      }});
    }
  });
});

// Set up rules for the /:dishId/comments/:commentId route, where :dishId can be any string passed in the URL and :commentId can be any string passed in the URL
dishRouter.route('/:dishId/comments/:commentId')
.all(Verify.verifyOrdinaryUser)
// Return the specified comment for valid GET requests
.get(function(req, res, next) {
  Dishes.findById(req.params.dishId)
  .populate('comments.postedBy')
  .exec(function(err, dish) {
    if(err) {
      throw err; 
    } else {
      res.json(dish.comments.id(req.params.commentId));
    }
  });
})
// Update the specified comment for valid PUT requests
.put(function(req, res, next) {
  Dishes.findById(req.params.dishId, function(err, dish) {
    if(err) {
      throw err; 
    } else {
      dish.comments.id(req.params.commentId).remove();
      // Set up the variable with the user record id
      req.body.postedBy = req.decoded._doc._id;
      dish.comments.push(req.body);
      dish.save(function(err, dish) {
      if(err) {
        throw err; 
      } else {
        console.log("Updated comment!");
        res.json(dish);
      }});
    }
  });
})
// Delete the specified comment for valid DELETE requests
.delete(function(req, res, next) {
  Dishes.findById(req.params.dishId, function(err, dish) {
    // Only allow deletion of comments if the user submitting the request is the one who created the comment
    if(dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id) {
      var err = new Error('You are not authorized to perform this operation!');
      err.status = 403;
      return next(err); 
    } else {
      dish.comments.id(req.params.commentId).remove();
      dish.save(function(err, resp) {
      if(err) {
        throw err; 
      } else {
        res.json(resp);
      }});
    }
  });
});

// Export the appropriate response object
module.exports = dishRouter;

