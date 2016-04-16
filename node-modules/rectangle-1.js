// Node module to calculate perimeter and area of a rectangle

/**
 * Uses the exports shortcut to define the module.exports perimeter method
 *
 * @params number $x Length of the rectangle.
 * @params number $y Width of the rectangle.
 * @return number Rectangle perimeter.
 */
exports.perimeter = function(x, y) {
  return (2*(x + y));
}

/**
 * Uses the exports shortcut to define the module.exports area method
 *
 * @params number $x Length of the rectangle.
 * @params number $y Width of the rectangle.
 * @return number Rectangle area.
 */
exports.area = function(x, y) {
  return (x * y);
}

