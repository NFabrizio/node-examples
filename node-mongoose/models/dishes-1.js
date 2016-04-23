var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Create a new schema
var dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
}, 
{
  timestamps: true
});

// Attach the schema to a model. If we specify a singular name for the model, Mongoose will create a collection using the plural version of the name. In this case, Mongoose will create a collection named dishes in the MongoDB.
var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;

