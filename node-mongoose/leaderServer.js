/**
 * Server that uses Mongoose, the leaderSchema and timeout
 *
 * Uses Mongoose to connect to the MongoDB, then creates a new leader using the Mongoose
 * create() method, waits 30 seconds, updates a leader and prints out the updated document.
 * Finally drops the database and closes the database connection.
 */

// Require necessary Node modules
var mongoose = require('mongoose');
var assert = require('assert');

// Require the model file module
var Leaders = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

// Connect to the MongoDB with Mongoose
mongoose.connect(url);
// Set up a variable to reference the database connection
var db = mongoose.connection;
// Handle any database connection errors
db.on('error', console.error.bind(console, 'connection error:'));

/** Once the database connection is open, log a message saying so, create a new leader referencing 
 * the Leaders model from the file module. Then, wait 30 seconds, update the leader and print out
 * the newly updated document. Drop the leaders collection and close the connection to the
 * database.
 */
db.once('open', function() {
  console.log("Connected correctly to server!");

  // Create a new leader w/ comments and new fields
  Leaders.create({
    name: 'Peter Pan',
    image: 'images/alberto.png',
    designation: 'Chief Epicurious Officer',
    abbr: 'CEO',
    description: 'Our CEO, Peter...'
  }, function(err, leader) {
    if(err) {
      throw err;
    } else {
      console.log("Leader created!");
      console.log(leader);
      var id = leader._id;
    }

    // Use the setTimeout method to force the application to wait for 30 seconds before continuing
    setTimeout(function() {
      // Update the leader. Setting new: true will cause the updated document to be returned rather than the original
      Leaders.findByIdAndUpdate(id, {
         $set: {
           description: "Updated unique description"
         }
      },
      {
        new: true
      }).
      // Execute the update statement above and print out the leader document that is returned
      exec(function(err, leader) {
        if(err) {
          throw err;
        } else {
          console.log("Updated leader!");
          console.log(leader);

          // Drop the leaders collection and close the database connection
          db.collection('leaders').drop(function() {
            db.close();
          }); // drop
        } // else
      }); // exec 
    }, 3000); // setTimeout  
  }); // create
}); // once

