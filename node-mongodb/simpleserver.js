/**
 * Simple server that handles basic MongoDB methods
 *
 * Requires necessary Node modules, sets up a database connection, runs an insert operation,
 * then runs a find operation and finally drops the collection and closes the connection to
 * the database.
 */

// Require the modules to be used
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL specicying the port # and the name of the database to connect to
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method of the MongoDB server package to connect to the server
MongoClient.connect(url, function(err, db) {
  // Assert will catch any errors and force the method to fail
  assert.equal(err, null);
  console.log("Connected correctly to the server");

  // Identify the collection in the database to connect to
  var collection = db.collection("dishes");

  // Insert a document into the collection
  collection.insertOne({ name: "Uthapizza", description: "Some description" }, function(err, result) {
    // Assert will catch any errors and force the method to fail
    assert.equal(err, null);
    console.log("After insert:");
    // Log a successful insert so that we can see what was inserted
    console.log(result.ops);

    // After successfully inserting a document, run a query to return what is in the database. Use toArray() to transform the results into a javascript array.
    collection.find({}).toArray(function(err, docs) {
      // Assert will catch any errors and force the method to fail
      assert.equal(err, null);
      console.log("Found:");
      // Log the results of the query
      console.log(docs);
    });

    // Remove the collection when we are done to clean up after ourselves
    db.dropCollection("dishes", function(err, result) {
      // Assert will catch any errors and force the method to fail
      assert.equal(err, null);
      // Close the connection to the database
      db.close();
    });
  });
});
