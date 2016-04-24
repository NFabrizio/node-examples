/**
 * Server that uses Mongoose, the promoSchema and timeout
 *
 * Uses Mongoose to connect to the MongoDB, then creates a new promotion using the Mongoose
 * create() method, waits 30 seconds, updates a promotion and prints out the updated document.
 * Finally drops the database and closes the database connection.
 */

// Require necessary Node modules
var mongoose = require('mongoose');
var assert = require('assert');

// Require the model file module
var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

// Connect to the MongoDB with Mongoose
mongoose.connect(url);
// Set up a variable to reference the database connection
var db = mongoose.connection;
// Handle any database connection errors
db.on('error', console.error.bind(console, 'connection error:'));

/** Once the database connection is open, log a message saying so, create a new promo referencing 
 * the Promotions model from the file module. Then, wait 30 seconds, update the promo and print out
 * the newly updated document. Drop the promotions collection and close the connection to the
 * database.
 */
db.once('open', function() {
  console.log("Connected correctly to server!");

  // Create a new promo w/ comments and new fields
  Promotions.create({
    name: 'Weekend Grand Buffet',
    image: 'images/buffet.png',
    label: 'New',
    price: '19.99',
    description: 'Featuring...'
  }, function(err, promo) {
    if(err) {
      throw err;
    } else {
      console.log("Promotion created!");
      console.log(promo);
      var id = promo._id;
    }

    // Use the setTimeout method to force the application to wait for 30 seconds before continuing
    setTimeout(function() {
      // Update the promo. Setting new: true will cause the updated document to be returned rather than the original
      Promotions.findByIdAndUpdate(id, {
         $set: {
           description: "Updated unique description"
         }
      },
      {
        new: true
      }).
      // Execute the update statement above and print out the promo document that is returned
      exec(function(err, promo) {
        if(err) {
          throw err;
        } else {
          console.log("Updated promotion!");
          console.log(promo);

          // Drop the promotions collection and close the database connection
          db.collection('promotions').drop(function() {
            db.close();
          }); // drop
        } // else
      }); // exec 
    }, 3000); // setTimeout  
  }); // create
}); // once

