/**
 * Dishes model module w/ comments
 *
 * Sets up the Mongoose schema for comments, and defines it as an array in the dishSChema. Also,
 * sets up the schema for dishes by requiring a name and description and also adding
 * timestamps so that created and updated dates are recorded. After defining schema, attaches it
 * to Dish, which creates a collection named dishes in the MongoDB and then exports the model for 
 * use in other modules.
 */

// Require necessary Node modules
var mongoose = require('mongoose');

// Set up mongoose schema
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

// Create the dishSchema and define the commentSchema as an array
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

/** Attach the schema to a model. If we specify a singular name for the model, Mongoose will create
 * a collection using the plural version of the name. In this case, Mongoose will create a
 * collection named dishes in the MongoDB.
 */
var Dishes = mongoose.model('Dish', dishSchema);

// Export Dishes so that it is available when requiring this module
module.exports = Dishes;

