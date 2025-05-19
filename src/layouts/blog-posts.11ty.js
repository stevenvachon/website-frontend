import {
  dateFull,
  dateISO,
  formatBlogCategoryTag,
  html,
} from '../scripts/util/index.js';

export const data = {
  layout: 'blog.11ty.js',
  tags: ['blog-posts'],
};

// TODO: https://github.com/aimee-gm/eleventy-plugin-read-more/issues/3
const excerpt = (content, tag = '<!--more-->') => content.split(tag)[0];
const hasMoreTag = (content, tag = '<!--more-->') => content.includes(tag);

export default ({ collections, tag }) => html`
  <div
    class="sv blog-posts"
    itemscope
    itemtype="https://schema.org/CollectionPage"
  >
    ${tag
      ? html`<h1 class="-blog-posts--title" itemprop="name">
          Archive for posts categorized as
          "<strong>${formatBlogCategoryTag(tag, true)}</strong>"
        </h1>`
      : ''}
    ${collections[tag ?? 'blog-post']
      .reverse()
      .map(
        ({ content, data: { date, title }, url }) => html`
          <div class="-blog-posts--item">
            <article
              class="sv blog-post"
              itemscope
              itemtype="https://schema.org/BlogPosting"
            >
              <header>
                <h2 class="-blog-post--title" itemprop="headline">
                  <a href="${url}" itemprop="url">${title}</a>
                </h2>
                <time
                  class="-blog-post--date"
                  datetime="${dateISO(date)}"
                  itemprop="datePublished"
                >
                  ${dateFull(date)}
                </time>
              </header>
              <div class="-blog-post--content" itemprop="description">
                ${excerpt(content)}
                ${hasMoreTag(content)
                  ? html`
                      <a
                        class="-blog-posts--item-read-more"
                        href="${url}"
                        rel="nofollow"
                        >Read more</a
                      >
                    `
                  : ''}
              </div>
            </article>
          </div>
        `
      )
      .join('')}
  </div>
`;
