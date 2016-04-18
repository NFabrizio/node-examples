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

module.exports = (function() {
  // Declare the express router and tell it to use the bodyPaser
  var promoRouter = express.Router();
  promoRouter.use(bodyParser.json());

  // Set up rules for the / route
  promoRouter.route('/')
  // For all valid requests, return a status of 200 and set the Content-Type to plaintext
  .all(function(req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // Tell the app to continue parsing when it reaches this point
    next();
  })
  // Return a simple message for valid GET requests
  .get(function(req, res, next) {
    res.end('Will send all the promotions to you!');
  })
  // Return a message containing the name and description of the new promotion for valid POST requests
  .post(function(req, res, next) {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
  })
  // Return a simple message for valid DELETE requests
  .delete(function(req, res, next) {
    res.end('Deleting all the promotions!');
  });

  // Set up rules for the /:promoId route, where :promoId can be any string passed in the URL
  promoRouter.route('/:promoId')
  // For all valid requests, return a status of 200 and set the Content-Type to plaintext
  .all(function(req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // Tell the app to continue parsing when it reaches this point
    next();
  })
  // Return a simple message for valid GET requests
  .get(function(req, res, next) {
    res.end('Will send details of the promotion: ' + req.params.promoId + ' to you!');
  })
  // Return a message containing the ID, name and description of the promotion to be updated for valid PUT requests
  .put(function(req, res, next) {
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
  })
  // Return a message containing the ID of the promotion to be deleted for valid DELETE requests
  .delete(function(req, res, next) {
    res.end('Deleting promotion: ' + req.params.promoId);
  });

  // Return the appropriate response object
  return promoRouter;
})();
