export const data = {
  eleventyExcludeFromCollections: true,
  permalink: 'robots.txt',
};

export default ({ site }) => `
User-agent: *
Allow: /
Sitemap: ${site.url}/sitemap.xml
`;
