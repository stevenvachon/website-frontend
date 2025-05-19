import { expect, test as it } from 'vitest';
import formatBlogCategoryTag from './formatBlogCategoryTag.js';

it('truncates', () => {
  expect(formatBlogCategoryTag('blog-category-something')).toBe('something');
});

it('optionally capitalizes the first letter', () => {
  expect(formatBlogCategoryTag('blog-category-something', true)).toBe(
    'Something'
  );
});

it('throws an error on invalid input', () => {
  ['something', ''].forEach((str) => {
    expect(() => formatBlogCategoryTag(str)).toThrow();
    expect(() => formatBlogCategoryTag(str, true)).toThrow();
  });
});
