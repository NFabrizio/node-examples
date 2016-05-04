/**
 * Dishes model module w/ comments and all fields
 *
 * Sets up the Mongoose schema for comments, and defines it as an array in the dishSchema. Sets up a
 * Currency schema type. Also, sets up the schema for dishes by requiring a name and description and
 * also adding timestamps so that created and updated dates are recorded. After defining schema,
 * attaches it to Dish, which creates a collection named dishes in the MongoDB and then exports the
 * model for use in other modules.
 */

// Require necessary Node modules
var mongoose = require('mongoose');

// Set up mongoose schema
var Schema = mongoose.Schema;

// Set up the Currency schema type
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// Create the comments schema and references the ObjectId for the user in the User schema so that we can cross-reference the user data with Mongoose populations
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
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false,
    default: ''
  },
  price: {
    type: Currency,
    required: true
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

