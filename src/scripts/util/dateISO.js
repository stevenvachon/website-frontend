/**
 * Formats to a date string in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ).
 * Times at exactly midnight will always be removed.
 * @param {Date} date
 */
export default (date, stripTime = false) => {
  const iso = new Date(date).toISOString();
  return stripTime
    ? iso.slice(0, iso.indexOf('T'))
    : iso.replace(/T00:00:00.000Z$/, '');
};
