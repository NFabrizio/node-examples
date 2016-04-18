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

// Add the file module routes
var dishRouter = require('./dishRouter');
var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderRouter');

// Set up the hostname and port config
var hostname = 'localhost';
var port = 3000;

// Set up express instance
var app = express();

// Set up app to use morgan for logging
app.use(morgan('dev'));

// Apply the routers to appropriate routes
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// Set up the public directory as the location for static files using a relative path to the directory
app.use(express.static(__dirname + '/public'));

// Start the server using the port and hostname config and log a message stating that it is running
app.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});

