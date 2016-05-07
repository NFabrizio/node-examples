/**
 * Automated script that adds two users and makes one of them an admin
 */

module.exports = function(app) {
  // Define the data source as the MongoDB
  var MongoDB = app.datasources.MongoDB;
  // On startup, automatically create 2 users
  MongoDB.automigrate('Customer', function(err) {
    if(err) {
      throw(err);
    } else {
      var Customer = app.models.Customer;
      // Create the users
      Customer.create([
        {username: 'Admin', email: 'admin@admin.com', password: 'abcdef'},
        {username: 'nick', email: 'nick@admin.com', password: 'abcdef'}
      ], function(err, users) {
        if(err) {
          return cb(err);
        } else {
          var Role = app.models.Role;
          var RoleMapping = app.models.RoleMapping;

          // Create the admin role
          Role.create({
            name: 'admin'
          }, function(err, role) {
            if(err) {
              cb(err);
            } else {
              // Give the first indexed user the role of admin
              role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id
              }, function(err, principal) {
                if(err) {
                  throw(err);
                }
              });
            }
          });
        }
      });
    }
  });
};

