var mongoose = require('mongoose');
var assert = require('assert');

// Require the model file module
var Dishes = require('./models/dishes-1');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
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

      db.collection('dishes').drop(function() {
        db.close();
      });
    });

  });
});

