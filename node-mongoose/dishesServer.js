/**
 * Server that uses Mongoose, the dishSchema and the commentSchema w/ new methods and timeout
 *
 * Uses Mongoose to connect to the MongoDB, then creates a new dish with comments using the Mongoose
 * create() method, waits 30 seconds, updates a dish and prints out the updated document. Then, adds
 * a new comment using the push method, saves it, and finally drops the database and closes the
 * database connection.
 */

// Require necessary Node modules
var mongoose = require('mongoose');
var assert = require('assert');

// Require the model file module
var Dishes = require('./models/dishes');

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
 * newly updated document. Add a new comment, save the document, drop the dishes collection and
 * close the connection to the database.
 */
db.once('open', function() {
  console.log("Connected correctly to server!");

  // Create a new dish w/ comments and new fields
  Dishes.create({
    name: 'Uthapizza',
    image: 'images/uthapizza.png',
    category: 'mains',
    label: 'Hot',
    price: '4.99',
    description: 'A unique dish...',
    comments: [{
      rating: 5,
      comment: "Imagine all the eatables, living in conFusion!",
      author: "John Lemon"
    },
    {
      rating: 4,
      comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
      author: "Paul McVites"
    }]
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
           description: "Updated unique description"
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

          // Push a new comment to the document
          dish.comments.push({
            rating: 5,
            comment: "I\'m getting a sinking feeling.",
            author: "Leonardo DiCarpaccio"
          });

          // Save the changes to the document
          dish.save(function(err, dish) {
            if(err) {
              throw err;
            } else {
              console.log("Comments updated!");
              console.log(dish);
            }

            // Drop the dishes collection and close the database connection
            db.collection('dishes').drop(function() {
              db.close();
            }); // drop
          }); // save
        } // else
      }); // exec 
    }, 3000); // setTimeout  
  }); // create

}); // once

