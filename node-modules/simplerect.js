// This is a simple javascript example to find the perimeter and area of rectangles

// Set up the rect object to give access to perimeter and area calculations
var rect = {
  perimeter: function(x, y) {
    return (2*(x + y));
  },
  area: function(x, y) {
    return (x * y);
  }
}

/**
 * Set up a function that will accept numbers to run perimeter and area calculations from
 *
 * Accepts two numbers and treats them as length and breadth/width of a rectangle. Calls the
 * perimeter and area methods from the rect object and logs the results of the calculations.
 *
 * @param number $l Length of the rectangle.
 * @param number $b Breadth/width of the rectangle.
 * @return null
 */

function solveRect(l, b) {
  // Log an explanation of the params passed into the function
  console.log("Solving for rectangle with l = " + l + " and b = " + b);
  // Check that length and breadth/width are both greater than zero, otherwise this is not a rectangle
  if(l < 0 || b < 0) {
    // Log an error message
    console.log("Rectangle dimensions should be greater than zero: l = " + l + ", and b = " + b);
  } else {
    // Log the results of the area calculation
    console.log("The area of the rectangle of dimensions length = " + l + " and breadth = " + b + " is " + rect.area(l, b));
    // Log the results of the perimeter calculation
    console.log("The perimeter of the rectangle of dimensions length = " + l + " and breadth = " + b + " is " + rect.perimeter(l, b));
  }
}

// Pass some parameters into the function for calculation
solveRect(2, 4);
solveRect(3, 5);
solveRect(-2, 10);
