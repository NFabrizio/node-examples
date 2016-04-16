/**
 * A simple express server that returns Hello World!
 */

// Add the core packages
var express = require('express');
var http = require('http');

// Set up the hostname and port config
var hostname = 'localhost';
var port = 3000;

// Set up express instance
var app = express();

// Configure the express server
app.use(function(req, res, next) {
  // Log the requeset headers
  console.log(req.headers);
  
  // Write the head messages
  res.writeHead(200, { 'Content-Type': 'text/html' });
  // Write the body of the response, close it and send it to the server
  res.end('<h1>Hello World!</h1>');
});

// Create the HTTP server
var server = http.createServer(app);

// Start the server using the port and hostname config and log a message stating that it is running
server.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});

