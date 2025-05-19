import {
  BLOG_CATEGORY_TAG_PREFIX,
  formatBlogCategoryTag,
  formatBlogCategoryTagURL,
} from '../../scripts/util/index.js';

/**
 * Generate a page of blog posts for each blog category (tag).
 */
export const data = {
  eleventyComputed: {
    permalink: ({ tag }) => formatBlogCategoryTagURL(tag),
    title: ({ tag }) =>
      `Category Archive for "${formatBlogCategoryTag(tag, true)}"`,
  },
  layout: 'blog-posts.11ty.js',
  pagination: {
    alias: 'tag', // Provided to `eleventyComputed` and `layout`
    /**
     * @param {{ data: { tags?: string[] } }[]} posts
     * @returns {string[]}
     */
    before: (posts) => [
      ...(posts.reduce((result, post) => {
        post.data.tags?.forEach((tag) => {
          if (tag.startsWith(BLOG_CATEGORY_TAG_PREFIX)) {
            result.add(tag);
          }
        });
        return result;
      }, new Set()) ?? []),
    ],
    data: 'collections.blog-post',
    size: 1, // No actual "pagination"
  },
  robots: ['follow', 'noindex'],
  tags: ['blog-category'], // Provided to `layout`
};
