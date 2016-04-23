var mongoose = require('mongoose');
var assert = require('assert');

// Require the model file module
var Dishes = require('./models/dishes-3');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected correctly to server!");

  // Create a new dish
  Dishes.create({
    name: 'Uthapizza',
    description: 'Test',
    comments: [{
      rating: 3,
      comment: "This is insane!",
      author: "Matt Daemon"
    }]
  }, function(err, dish) {
    if(err) {
      throw err;
    } else {
      console.log("Dish created!");
      console.log(dish);
      var id = dish._id;
    }

    setTimeout(function() {
    // Get all the dishes
      Dishes.findByIdAndUpdate(id, {
         $set: {
           description: "Updated test"
         }
      },
      {
        new: true
      }).
      exec(function(err, dish) {
        if(err) {
          throw err;
        } else {
          console.log("Updated dish!");
          console.log(dish);

          dish.comments.push({
            rating: 5,
            comment: "I\'m getting a sinking feeling.",
            author: "Leonardo DiCarpaccio"
          });

          dish.save(function(err, dish) {
            if(err) {
              throw err;
            } else {
              console.log("Comments updated!");
              console.log(dish);
            }

            db.collection('dishes').drop(function() {
              db.close();
            }); // drop
          }); // save
        } // else
      }); // exec 
    }, 3000); // setTimeout  
  }); // create

}); // once

