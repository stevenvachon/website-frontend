/**
 * Formats to a date string like "Monday, January 1, 2000".
 * @param {Date} date
 */
export default (date) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeZone: 'UTC',
  }).format(new Date(date));
