/**
 * Server that handles basic MongoDB operation defined in a file module
 *
 * Requires necessary Node and file modules, sets up a database connection, runs an insert
 * operation, which runs a find operation in its callback which runs an update operation in its
 * callback which runs a find operation in its callback which runs a dropCollection operation
 * and closes the connection to the database in its callback. This module is obviously a little
 * overly complicated, but demonstrates all of the operations in one go.
 */

// Require the modules to be used
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Require the file module with the operations to be used
var dboper = require('./operations');

// Connection URL specicying the port # and the name of the database to connect to
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method of the MongoDB server package to connect to the server
MongoClient.connect(url, function(err, db) {
  // Assert will catch any errors and force the method to fail
  assert.equal(err, null);
  console.log("Connected correctly to the server");

  // Insert a document into the dishes collection
  dboper.insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes", function(result) {
    // Print out the returned value of the results
    console.log(result.ops);

    // Find a document in the dishes collection
    dboper.findDocuments(db, "dishes", function(docs) {
      // Print out the returned value of the docs from the callback function
      console.log(docs);

      // Update the document in the dishes collection
      dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated test" }, "dishes", function(result) {
        // Print out the returned value of the result from the callback function
        console.log(result.result);

        // Find a document in the dishes collection
        dboper.findDocuments(db, "dishes", function(docs) {
          // Print out the returned value of the docs from the callback function
          console.log(docs);
 
          // Drop the dishes collection to clean up after ourselves
          db.dropCollection("dishes", function(result) {
            // Print out the returned value of the result from the callback function
            console.log(result);
            // Close the connection to the database
            db.close();
          }); // dropCollection
        }); // findDocuments
      }); // updateDocument
    }); // findDocuments
  }); // insertDocument
}); // MongoClient.connect
