/**
 * leaderRouter Node module that handles /leaders route
 *
 * A Node file module that handles the /leaders and /leaders/:leaderId routes. Sets up an
 * Express Router instance and handles JSON request body with bodyParser. Sets up route
 * handling for GET, POST and DELETE requests for the /leaders route and GET, PUT and DELETE 
 * requests for the /leaders/:leaderId route. Currently, not connected to a database, so
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
 * be /leaders for this application. Handles GET, PUT and DELETE requests for that route so that
 * data for existing leaders could be retrieved, a new leader could be added or all leaders
 * could be deleted. Also handles GET, POST and DELETE requests for the /:leaderId route, which
 * would actually be /leaders/:leaderId for this application. It handles these so that data for
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

module.exports = (function() {
  // Declare the express router and tell it to use the bodyPaser
  var leaderRouter = express.Router();
  leaderRouter.use(bodyParser.json());

  // Set up rules for the / route
  leaderRouter.route('/')
  // For all valid requests, return a status of 200 and set the Content-Type to plaintext
  .all(function(req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // Tell the app to continue parsing when it reaches this point
    next();
  })
  // Return a simple message for valid GET requests
  .get(function(req, res, next) {
    res.end('Will send all the leaders to you!');
  })
  // Return a message containing the name and description of the new leader for valid POST requests
  .post(function(req, res, next) {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
  })
  // Return a simple message for valid DELETE requests
  .delete(function(req, res, next) {
    res.end('Deleting all the leaders!');
  });

  // Set up rules for the /:leaderId route, where :leaderId can be any string passed in the URL
  leaderRouter.route('/:leaderId')
  // For all valid requests, return a status of 200 and set the Content-Type to plaintext
  .all(function(req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // Tell the app to continue parsing when it reaches this point
    next();
  })
  // Return a simple message for valid GET requests
  .get(function(req, res, next) {
    res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
  })
  // Return a message containing the ID, name and description of the leader to be updated for valid PUT requests
  .put(function(req, res, next) {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
  })
  // Return a message containing the ID of the leader to be deleted for valid DELETE requests
  .delete(function(req, res, next) {
    res.end('Deleting leader: ' + req.params.leaderId);
  });

  // Return the appropriate response object
  return leaderRouter;
})();
