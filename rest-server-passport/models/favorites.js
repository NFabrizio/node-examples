/**
 * Favorites model module
 *
 * Sets up the Mongoose favorites schema with required fields and timestamps so that created 
 * and updated dates are recorded. After defining schema, attaches it to Favorite, which 
 * creates a collection named favorites in the MongoDB and then exports the model for use in
 * other modules.
 */

// Require necessary Node modules
var mongoose = require('mongoose');

// Set up mongoose schema
var Schema = mongoose.Schema;

// Create the promoSchema
var favoriteSchema = new Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish'
  }]
}, 
{
  timestamps: true
});

/** 
 * Attach the schema to a model. If we specify a singular name for the model, Mongoose will 
 * create a collection using the plural version of the name. In this case, Mongoose will 
 * create a collection named favorites in the MongoDB.
 */
var Favorites = mongoose.model('Favorite', favoriteSchema);

// Export Favorites so that it is available when requiring this module
module.exports = Favorites;

