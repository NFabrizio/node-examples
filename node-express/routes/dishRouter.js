
// Set up rules for the / route
exports.allDishes = function(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Tell the app to continue parsing when it reaches this point
  next();
}
exports.getDishes = function(req, res, next) {
  res.end('Will send all the dishes to you!');
}
exports.postDishes = function(req, res, next) {
  res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
}
exports.deleteDishes = function(req, res, next) {
  res.end('Deleting all the dishes!');
}

// Set up rules for the /:dishId route
exports.allDish = function(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Tell the app to continue parsing when it reaches this point
  next();
}
exports.getDish = function(req, res, next) {
  res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
}
exports.putDish = function(req, res, next) {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
}
exports.deleteDish = function(req, res, next) {
  res.end('Deleting dish: ' + req.params.dishId);
}
