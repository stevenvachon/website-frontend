/**
 * Logs a warning message to the console when an unnecessary attribute was defined.
 * @param {string} attrName The name of the attribute that was ignored.
 * @param {string} effect The name of the effect that ignored the attribute.
 * @returns {boolean} Whether the warning was logged or not.
 */
export default (attrName, effect) => {
  console.warn(`Ignored ${attrName} for "${effect}" effect.`);
  return true;
};
