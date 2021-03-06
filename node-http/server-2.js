// Add the core packages
var http = require('http');
var fs = require('fs');
var path = require('path');

// Set up the hostname and port config
var hostname = 'localhost';
var port = 3000;

// Create the server
var server = http.createServer(function(req, res) {
  // Log the request information
  console.log('Request for ' + req.url + ' by method ' + req.method);

  // Set up the server to handle GET requests
  if(req.method == 'GET') {
    // Declare a fileUrl variable
    var fileUrl;

    // If the request URL ends in a /, send the index.html page
    if(req.url == '/') {
      fileUrl = '/index.html';
    } else {
      fileUrl = req.url;
    }

    // Construct the absolute URL to the file
    var filePath = path.resolve('./public' + fileUrl);

    // Check the file extension
    var fileExt = path.extname(filePath);

    // Check the file extensions are all html
    if(fileExt == '.html') {
      // If file exists, send the file
      fs.exists(filePath, function(exists) {
        // If the file does not exist, throw a 404
        if(! exists) {
          // Write the error head
          res.writeHead(404, { 'Content-Type': 'text/html' });
          // End the response and send it the the error message
          res.end('<h1>Error 404: ' + fileUrl + ' not found</h1>');
          return;
        // If the file does exist, return the file
        } else {
          // Write the success head
          res.writeHead(200, { 'Content-Type': 'text/html' });
          // Open a stream to read file contents and pipe them to the response
          fs.createReadStream(filePath).pipe(res);
        }
      });
    // Send an error if files are not html
    } else {
      // Write the error head
      res.writeHead(404, { 'Content-Type': 'text/html' });
      // End response and send it with this message
      res.end('<h1>Error 404: ' + fileUrl + ' not an html file</h1>');
    }
  // Handle requests that are not GET
  } else {
    // Write the error head
    res.writeHead(400, { 'Content-Type': 'text/html' });
    // End response and send it with error message
    res.end('<h1>Error 400: ' + req.method + ' method not supported</h1>');
  }
});

// Start the server using the port and hostname config and log a message stating that it is running
server.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});
