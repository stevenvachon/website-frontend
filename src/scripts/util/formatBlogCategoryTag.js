export const BLOG_CATEGORY_TAG_PREFIX = 'blog-category-';

/**
 * Removes the technically necessary prefix from a blog category tag name.
 * @param {string} tag
 * @param {boolean} titleCase
 */
export default (tag, titleCase = false) => {
  const truncated = tag.replace(BLOG_CATEGORY_TAG_PREFIX, '');
  if (truncated === tag) {
    throw new Error(
      `Tag "${tag}" does not start with "${BLOG_CATEGORY_TAG_PREFIX}"`
    );
  }
  if (titleCase) {
    return `${truncated[0].toUpperCase()}${truncated.slice(1)}`;
  } else {
    return truncated;
  }
};
