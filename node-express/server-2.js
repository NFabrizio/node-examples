/**
 * A simple server that serves static files
 *
 * When trying to GET files that exist, the server will serve the files. Trying other operations
 * will result in express throwing a 404 and returning a message that says the operations are 
 * not allowed. A GET request for a file that does not exist will also return a 404.
 */

// Add the core packages
var express = require('express');
var morgan = require('morgan');

// Set up the hostname and port config
var hostname = 'localhost';
var port = 3000;

// Set up express instance
var app = express();

// Set up app to use morgan for logging
app.use(morgan('dev'));
// Set up the public directory as the location for static files using a relative path to the directory
app.use(express.static(__dirname + '/public'));

// Start the server using the port and hostname config and log a message stating that it is running
app.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});

