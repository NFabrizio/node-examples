/**
 * MongoDB operations module
 *
 * Sets up some MongoDB operations that can be accessed in other modules. Handles insert, find,
 * delete and update operations. 
 */

// Require the necessary Node modules
var assert = require('assert');

/**
 * insertDocument method
 * 
 * Handles inserting documents into the specified database and collection, checks if an error is
 * returned from the insert operation, and if not, logs a message with the result and passes the
 * result to callback function.
 *
 * @see db.collection()
 * @see insert()
 * @see assert.equal()
 *
 * @params String $db The connected database.
 * @params Object $document The document to be inserted.
 * @params String $collection The collection to insert the document into.
 * @params Function $callback The callback function to pass results back to.
 * @params Object $err Error returned from the insert operation.
 * @params Object $result Result returned from the insert operation.
 *
 * @return null
 */
exports.insertDocument = function(db, document, collection, callback) {
  // Get the documents collection
  var coll = db.collection(collection);

  // Insert some documents
  coll.insert(document, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted " + result.result.n + " documents into the document collection " + collection);
    callback(result);
  });
};

/**
 * findDocuments method
 * 
 * Handles finding documents in the specified database and collection, converts the results to
 * an array, checks if an error is returned from the insert operation, and if not, passes the
 * result to callback function.
 *
 * @see db.collection()
 * @see find()
 * @see toArray()
 * @see assert.equal()
 *
 * @params String $db The connected database.
 * @params String $collection The collection to find the document in.
 * @params Function $callback The callback function to pass results back to.
 * @params Object $err Error returned from the find operation.
 * @params Object $docs Documents returned from the find operation.
 *
 * @return null
 */
exports.findDocuments = function(db, collection, callback) {
  // Get the documents collection
  var coll = db.collection(collection);

  // Find some documents
  coll.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
};

/**
 * removeDocuments method
 * 
 * Handles deleting documents from the specified database and collection, checks if an error is
 * returned from the deleteOne operation, and if not, logs a message with the result and passes 
 * the result to callback function.
 *
 * @see db.collection()
 * @see deleteOne()
 * @see assert.equal()
 *
 * @params String $db The connected database.
 * @params Object $document The document to be deleted.
 * @params String $collection The collection to delete the document from.
 * @params Function $callback The callback function to pass results back to.
 * @params Object $err Error returned from the delete operation.
 * @params Object $result Result returned from the delete operation.
 *
 * @return null
 */
exports.removeDocuments = function(db, document, collection, callback) {
  // Get the documents collection
  var coll = db.collection(collection);

  // Delete some documents
  coll.deleteOne(document, function(err, result) {
    assert.equal(err, null);
    console.log("Removed the document " + document);
    callback(result);
  });
};

/**
 * updateDocument method
 * 
 * Handles updating documents from the specified database and collection, checks if an error is
 * returned from the updateOne operation, and if not, logs a message with the result and passes 
 * the result to callback function.
 *
 * @see db.collection()
 * @see updateOne()
 * @see assert.equal()
 *
 * @params String $db The connected database.
 * @params Object $document The document to be updated.
 * @params Object $update The parameters to use for making the update to the document.
 * @params String $collection The collection containing the document to update.
 * @params Function $callback The callback function to pass results back to.
 * @params Object $err Error returned from the update operation.
 * @params Object $result Result returned from the update operation.
 *
 * @return null
 */
exports.updateDocument = function(db, document, update, collection, callback) {
  // Get the documents collection
  var coll = db.collection(collection);

  // Update some documents
  coll.updateOne(document, { $set: update }, null, function(err, result) {
    assert.equal(err, null);
    console.log("Updated the document with " + update);
    callback(result);
  });
};
