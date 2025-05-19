import formatBlogCategoryTag from './formatBlogCategoryTag.js';

/**
 * Returns the URL to a blog category.
 * @param {string} tag
 */
export default (tag) => `/blog/category/${formatBlogCategoryTag(tag)}/`;
