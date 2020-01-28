// This function takes two parameters, a static spatial layout (SSL) and a target object to place new values into
// (typically an empty object, as in the commented out example below). It iterates through the SSL and transforms
// the target object into a styled equivalent, producing strings with "px" appended from all numbers in the 
// original SSL. There is a commented out example below. 

function styleStaticComponentR(SSL, target) {
  const keys = Object.keys(SSL);
  keys.map(
    key => {
      if (typeof(SSL[key]) === "number") {
        target[key] = `${SSL[key]}px`;
      } 
      else if (typeof(SSL[key]) === "object") {
        target[key] = {};
        return styleStaticComponentR(SSL[key], target[key]);
      }
      else if (typeof(SSL[key]) === "string") {
        target[key] = SSL[key];
      }
    }
  )
}

export default styleStaticComponentR;