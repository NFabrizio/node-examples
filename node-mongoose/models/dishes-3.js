var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Create the comments schema
var commentSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

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
  },
  comments: [commentSchema]
}, 
{
  timestamps: true
});

// Attach the schema to a model. If we specify a singular name for the model, Mongoose will create a collection using the plural version of the name. In this case, Mongoose will create a collection named dishes in the MongoDB.
var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;

