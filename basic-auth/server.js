/**
 * A simple server that serves static files and forces authentication
 *
 * When trying to GET files that exist, the server will serve the files. Trying other operations
 * will result in express throwing a 404 and returning a message that says the operations are 
 * not allowed. A GET request for a file that does not exist will also return a 404. The
 * application will require basic authorization with a username and password in order to access
 * the static files.
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

/**
 * Set up authorization middleware
 *
 * Set up the authorization middleware, checking for a specific username and password. Throw a 401
 * error if there is no authorization header provided with the request. Otherwise, decode it using
 * base64, convert it to a string and split the string at the colon to get the username and
 * password. Check to make sure the username and password are correct, and if not, throw an error
 * with a status of 401. 
 *
 * @see Error()
 * @see next()
 * @see Buffer()
 * @see toString()
 * @see split()
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
 * @return null
 */

function auth(req, res, next) {
  console.log(req.headers);
  // Get the authorization header from the request
  var authHeader = req.headers.authorization;

  // Handle the case that there is no authHeader
  if(! authHeader) {
    // Set up a new error message
    var err = new Error("You are not authenticated!");
    // Set the status for the error to 401
    err.status = 401;
    // Call next() and pass it the error
    next(err);
    return;
  }

  // If there is an authHeader, decode it using base64, convert it to a string and then split the string at the colon
  var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');

  // Set up the username and password variables from the authHeader for authentication
  var user = auth[0]; 
  var pass = auth[1];

  // Check the username and password for authenticity
  if(user == 'admin' && pass == 'password') {
    next(); // authorized
  } else {
    var err = new Error("You are not authenticated!");
    err.status = 401;
    next(err);
  }
}

// Apply the authentication function
app.use(auth);

// Set up the public directory as the location for static files using a relative path to the directory
app.use(express.static(__dirname + '/public'));

/**
 * Handle any errors and send a message to the client
 *
 * If there is an error, send the error message and status to the client with a reminder to
 * authenticate with Basic authentication. This reminder will cause most browsers to ask for a
 * usernmane and password in a popup modal.
 *
 * @see writeHead()
 * @see end()
 *
 * @params Object $err {
 *      Error response from the server
 *         
 *      @type Number $status Status of the error (404, 401, 301, etc).
 *      @type String $message Error message description.
 * }
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
 * @return null
 */
app.use(function(err, req, res, next) {
  res.writeHead(err.status || 500, {
    'WWW-Authenticate': 'Basic',
    'Content-Type': 'text/plain'
  });
  res.end(err.message);
});

// Start the server using the port and hostname config and log a message stating that it is running
app.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});

