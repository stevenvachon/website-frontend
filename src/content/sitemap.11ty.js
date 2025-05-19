import { dateISO, html as xml } from '../scripts/util/index.js';

export const data = {
  eleventyExcludeFromCollections: true,
  permalink: 'sitemap.xml',
};

export default ({
  collections,
  site,
}) => xml`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    ${collections.all
      .filter(({ data, url }) => url && !data.robots?.includes('noindex'))
      .sort(({ url: urlA }, { url: urlB }) => (urlA < urlB ? -1 : 1))
      .map(
        ({ data, url }) => xml`
          <url>
            <loc>${site.url}${url}</loc>
            ${data.date ? xml`<lastmod>${dateISO(data.date)}</lastmod>` : ''}
          </url>`
      )
      .join('')}
  </urlset>`;
