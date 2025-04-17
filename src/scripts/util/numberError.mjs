/**
 * Logs an error message to the console when a (numeric) attribute is invalid.
 * @param {number | string} value The value of the attribute.
 * @param {string} attrName The name of the attribute.
 * @returns {boolean} Whether the error was logged or not.
 */
export default (value, attrName) => {
  if (Number.isNaN(parseFloat(value))) {
    console.error(`Invalid ${attrName} value: "${value}". Expected a number.`);
    return true;
  }
  if (parseFloat(value) < 0) {
    console.error(`Invalid ${attrName} value: "${value}". Must be >= 0.`);
    return true;
  }
  return false;
};
