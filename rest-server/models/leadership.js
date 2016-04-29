/**
 * Leadership model module
 *
 * Sets up the Mongoose leaders schema with required fields and timestamps so that created and
 * updated dates are recorded. After defining schema, attaches it to Leader, which creates a
 * collection named leaders in the MongoDB and then exports the model for use in other modules.
 */

// Require necessary Node modules
var mongoose = require('mongoose');

// Set up mongoose schema
var Schema = mongoose.Schema;

// Create the leaderSchema
var leaderSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  abbr: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, 
{
  timestamps: true
});

/** Attach the schema to a model. If we specify a singular name for the model, Mongoose will create
 * a collection using the plural version of the name. In this case, Mongoose will create a
 * collection named promotions in the MongoDB.
 */
var Leaders = mongoose.model('Leader', leaderSchema);

// Export Dishes so that it is available when requiring this module
module.exports = Leaders;

