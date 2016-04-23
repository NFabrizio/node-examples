/**
 * Server that uses Mongoose and the dishSchema w/ new methods and timeout
 *
 * Uses Mongoose to connect to the MongoDB, then creates a new dish with the Mongoose create()
 * method, waits 30 seconds, updates a dish and prints out the updated document. Then, drops the
 * database and closes the database connection.
 */

// Require necessary Node modules
var mongoose = require('mongoose');
var assert = require('assert');

// Require the model file module
var Dishes = require('./models/dishes-1');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

// Connect to the MongoDB with Mongoose
mongoose.connect(url);
// Set up a variable to reference the database connection
var db = mongoose.connection;
// Handle any database connection errors
db.on('error', console.error.bind(console, 'connection error:'));

/** Once the database connection is open, log a message saying so, create a new dish referencing the
 * Dishes model from the file module. Then, wait 30 seconds, update the dish and print out the 
 * newly updated document, drop the dishes collection and close the connection to the database.
 */
db.once('open', function() {
  console.log("Connected correctly to server!");

  // Create a new dish and set the variable id to the document id
  Dishes.create({
    name: 'Uthapizza',
    description: 'Test'
  }, function(err, dish) {
    if(err) {
      throw err;
    } else {
      console.log("Dish created!");
      console.log(dish);
      var id = dish._id;
    }

    // Use the setTimeout method to force the application to wait for 30 seconds before continuing
    setTimeout(function() {
      // Update the dish. Setting new: true will cause the updated document to be returned rather than the original
      Dishes.findByIdAndUpdate(id, {
         $set: {
           description: "Updated test"
         }
      },
      {
        new: true
      }).
      // Execute the update statement above and print out the dish document that is returned
      exec(function(err, dish) {
        if(err) {
          throw err;
        } else {
          console.log("Updated dish!");
          console.log(dish);
        }
    
        // Drop the dishes collection and close the database connection
        db.collection('dishes').drop(function() {
          db.close();
        }); // drop
      }); // exec 
    }, 3000); // setTimeout  
  }); // create

}); // once

