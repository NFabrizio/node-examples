/**
 * Simple server that handles CRUD operations using Express Router
 * 
 * Sets up a server that will handle CRUD operations using body-parser and Express Router 
 * methods. Returns messages describing what would have been done had there been a database
 * installed for this application, but will not actually do anything.
 */

// Add the core packages
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// Set up the hostname and port config
var hostname = 'localhost';
var port = 3000;

// Set up express instance
var app = express();

// Set up app to use morgan for logging
app.use(morgan('dev'));

// Declare the express route and tell it to use the bodyPaser
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

// Set up rules for the / route
dishRouter.route('/')
.all(function(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Tell the app to continue parsing when it reaches this point
  next();
})
.get(function(req, res, next) {
  res.end('Will send all the dishes to you!');
})
.post(function(req, res, next) {
  res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete(function(req, res, next) {
  res.end('Deleting all the dishes!');
});

// Set up rules for the /:dishId route
dishRouter.route('/:dishId')
.all(function(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Tell the app to continue parsing when it reaches this point
  next();
})
.get(function(req, res, next) {
  res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
})
.put(function(req, res, next) {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete(function(req, res, next) {
  res.end('Deleting dish: ' + req.params.dishId);
});

// Apply the dishRouter to any route containing /dishes
app.use('/dishes', dishRouter);

// Set up the public directory as the location for static files using a relative path to the directory
app.use(express.static(__dirname + '/public'));

// Start the server using the port and hostname config and log a message stating that it is running
app.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});

