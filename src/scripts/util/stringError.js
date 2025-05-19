/**
 * Logs an error message to the console when a (string) attribute is invalid.
 * @param {string} value The value of the attribute.
 * @param {string[]} values The accepted values for the attribute.
 * @param {string} attrName The name of the attribute.
 * @returns {boolean} Whether the error was logged or not.
 */
export default (value, values, attrName) => {
  if (!values.includes(value)) {
    console.error(
      `Invalid ${attrName} value: "${value}". Expected ${values
        .map((e) => `"${e}"`)
        .join(' or ')}.`
    );
    return true;
  }
  return false;
};
