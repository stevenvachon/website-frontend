import classNames from 'classnames';
import {
  BLOG_CATEGORY_TAG_PREFIX,
  formatBlogCategoryTag,
  formatBlogCategoryTagURL,
  html,
} from '../scripts/util/index.js';

export const data = {
  layout: 'main.11ty.js',
  projectiles: 'ltr',
  tags: ['blog'],
};

export default ({ collections, content, tag, tags }) => {
  const categories = (() => {
    const posts = collections['blog-post'];
    const obj = posts.reduce(
      (categories, post) => {
        post.data.tags
          .filter((tag) => tag.startsWith(BLOG_CATEGORY_TAG_PREFIX))
          .forEach((tag) => {
            if (categories[tag] === undefined) {
              categories[tag] = {
                count: 0,
                tag,
                title: formatBlogCategoryTag(tag, true),
                url: formatBlogCategoryTagURL(tag),
              };
            }
            categories[tag].count++;
          });
        return categories;
      },
      {
        _all: {
          count: posts.length,
          tag: '_null',
          title: 'All posts',
          url: '/blog',
        },
      }
    );
    return Object.keys(obj)
      .sort()
      .map((key) => obj[key]);
  })();

  return html`
    <div class="sv blog">
      <div class="sv pane" role="presentation"></div>
      <main class="-blog--primary">${content}</main>
      <hr />
      <aside class="-blog--secondary">
        <nav class="-blog--secondary-organizing">
          <p class="-blog--secondary-organizing-title">
            <span class="sv hidden">Blog </span>Categories<span
              class="sv hidden"
              >:</span
            >
          </p>
          <ul class="-blog--secondary-organizing-categories">
            ${categories
              .map(
                (category) => html`
                  <li
                    class="${classNames({
                      '-blog--secondary-organizing-categories-selected':
                        //!tags.includes('blog-archives') &&
                        !tags.includes('blog-post') &&
                        (category.tag === tag ||
                          (tag === undefined && category.tag === '_null')),
                    })}"
                  >
                    <a href="${category.url}" itemprop="url"
                      ><span itemprop="name">${category.title}</span></a
                    >
                    (${category.count})
                  </li>
                `
              )
              .join('')}
          </ul>
          <ul class="-blog--secondary-organizing-archives">
            <!--<li><a href="/blog/archives">Archives</a></li>-->
          </ul>
        </nav>
        <nav class="-blog--secondary-other">
          <ul>
            <li>
              <a
                class="-blog--secondary-other-rss"
                href="/blog/feed.xml"
                rel="alternate"
                target="_blank"
                title="Subscribe to Steven's Blog"
              >
                Subscribe
              </a>
            </li>
            <li>
              <a
                class="-blog--secondary-other-x"
                href="//x.com/stevenvachon"
                rel="external me noopener"
                target="_blank"
                title="Follow Steven on X/Twitter"
              >
                Follow
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  `;
};
