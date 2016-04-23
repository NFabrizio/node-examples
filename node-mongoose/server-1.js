/**
 * Server that uses Mongoose and the dishSchema
 *
 * Uses Mongoose to connect to the MongoDB, then creates a new dish, saves it, prints out all dishes
 * in the database, drops the database and closes the database connection.
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
 * Dishes model from the file module and save it. Then, print out all the dishes in the database,
 * drop the dishes collection and close the connection to the database.
 */
db.once('open', function() {
  console.log("Connected correctly to server!");

  // Create a new dish
  var newDish = Dishes({
    name: 'Uthapizza',
    description: 'Test'
  });

  newDish.save(function(err) {
    if(err) {
      throw err;
    } else {
      console.log("Dish created!");
    }

    // Get all the dishes
    Dishes.find({}, function(err, dishes) {
      if(err) {
        throw err;
      } else {
        console.log(dishes);
      }

      // Drop the dishes collection and close the database connection
      db.collection('dishes').drop(function() {
        db.close();
      });
    });

  });
});

