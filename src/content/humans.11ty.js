import { dateISO } from '../scripts/util/index.js';

export const data = {
  eleventyExcludeFromCollections: true,
  permalink: 'humans.txt',
};

export default ({ site }) => `
/* TEAM */
  Owner/Designer/Developer: Steven Vachon
  GitHub: https://github.com/stevenvachon
  Location: Niagara Falls, Canada

/* THANKS */
  To all developers in the open-source community.

/* SITE */
  Version: ${site.version}
  Last update: ${dateISO(site.lastModified, true)}
  Language: English
  Standards: CSS & SCSS, HTML, JavaScript, JSON, JSON-LD, Markdown, OpenAPI, SVG, YAML, HTTP
  Components: AWS, Eleventy, GitHub Actions, Node.js
`;
