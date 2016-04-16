/**
 * Simple server that handles CRUD operations
 * 
 * Sets up a server that will handle CRUD operations using body-parser and Express methods. 
 * Returns messages describing what would have been done had there been a database installed
 * for this application, but will not actually do anything.
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
// Allow the app to use the bodyParser to parse the json in the message
app.use(bodyParser.json());

// Returns 200 OK for all requests sent to /dishes
app.all('/dishes', function(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Tell the app to continue parsing when it reaches this point
  next();
});

// Handles GET requests and returns a placeholder that says what would happen if the database were installed
app.get('/dishes', function(req, res, next) {
  res.end('Will send all the dishes to you!');
});

// Handles POST requests and returns a response restating what was sent in the request
app.post('/dishes', function(req, res, next) {
  res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

// Handles DELETE requests and returns a placeholder that says what would happen if the database were installed
app.delete('/dishes', function(req, res, next) {
  res.end('Deleting all the dishes!');
});

// Handles GET requests to a specific dish ID and returns a message stating that the details would be returned if the database were installed
app.get('/dishes/:dishId', function(req, res, next) {
  res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
});

// Handles PUT requests to a specific dish ID and returns a message stating that the details would be updated if the database were installed
app.put('/dishes/:dishId', function(req, res, next) {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

// Handles DELETE requests to a specific dish ID and returns a message stating that the dish would be deleted if the database were installed
app.delete('/dishes/:dishId', function(req, res, next) {
  res.end('Deleting dish: ' + req.params.dishId);
});

// Set up the public directory as the location for static files using a relative path to the directory
app.use(express.static(__dirname + '/public'));

// Start the server using the port and hostname config and log a message stating that it is running
app.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});

