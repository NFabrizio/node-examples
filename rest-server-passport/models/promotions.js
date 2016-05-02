/**
 * Promotions model module
 *
 * Sets up the Mongoose promotions schema with required fields and timestamps so that created and
 * updated dates are recorded, and adds a Currency schema type. After defining schema, attaches it
 * to Promotion, which creates a collection named promotions in the MongoDB and then exports the 
 * model for use in other modules.
 */

// Require necessary Node modules
var mongoose = require('mongoose');

// Set up mongoose schema
var Schema = mongoose.Schema;

// Set up the Currency schema type
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// Create the promoSchema
var promoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
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
  }
}, 
{
  timestamps: true
});

/** Attach the schema to a model. If we specify a singular name for the model, Mongoose will create
 * a collection using the plural version of the name. In this case, Mongoose will create a
 * collection named promotions in the MongoDB.
 */
var Promotions = mongoose.model('Promotion', promoSchema);

// Export Dishes so that it is available when requiring this module
module.exports = Promotions;

