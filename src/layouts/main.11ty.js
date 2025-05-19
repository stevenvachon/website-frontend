import classNames from 'classnames';
import { dateISO, dateYear, html } from '../scripts/util/index.js';

export default ({
  content,
  date,
  description,
  eleventy,
  page,
  projectiles,
  robots,
  site,
  tags,
  title,
}) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      ${['blog-archives', 'blog-category', 'blog-post'].some((tag) =>
        tags.includes(tag)
      )
        ? html`<title>${title} • Steven Vachon's Blog</title>`
        : !tags.includes('homepage')
        ? html`<title>${title} • Steven Vachon</title>`
        : html`<title>${title}</title>`}
      ${description
        ? html`<meta name="description" content="${description}" />`
        : ''}
      <meta name="generator" content="${eleventy.generator}" />
      <meta name="robots" content="${robots?.join(',') || 'follow,index'}" />
      <meta name="version" content="${site.version}" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      ${tags?.includes('blog')
        ? html`<link
            rel="alternate"
            href="/blog/feed.xml"
            type="application/atom+xml"
          />`
        : ''}
      ${date
        ? html`<meta
            property="article:published_time"
            content="${dateISO(date)}"
          />`
        : ''}
      <link rel="author" href="/humans.txt" type="text/plain" />
      ${!tags?.includes('error-page')
        ? html`<link rel="canonical" href="${site.url}${page.url}" />`
        : ''}
      <link rel="icon" href="/images/favicon.png" type="image/png" />
      <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
      <link
        rel="license"
        href="//creativecommons.org/licenses/by-nc-nd/4.0/deed.en"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&display=swap"
      />
      <link
        rel="stylesheet"
        href="/styles.css?v=${site.version}"
        media="screen"
      />
      <script src="/scripts.js?v=${site.version}"></script>
      ${tags?.includes('blog-post')
        ? html`
            <script>
              const disqus_config = function () {
                this.page.url = '${site.url}${page.url}';
              };
            </script>
            <script async src="//svachon.disqus.com/embed.js"></script>
          `
        : ''}
    </head>
    <body>
      <header class="sv header">
        <div class="-header--nav-home">
          <a aria-label="Go to homepage" href="/">
            ${tags?.includes('homepage')
              ? html`<h1>Steven Vachon</h1>`
              : 'Steven Vachon'}
          </a>
        </div>
        ${!tags?.includes('error-page')
          ? html`
              <nav aria-label="Website Navigation" class="-header--nav-main">
                <ul>
                  <!-- <li
                    itemscope
                    itemtype="https://schema.org/SiteNavigationElement"
                  >
                    <a href="/approach/" itemprop="url"><span itemprop="name">Approach</span></a>
                  </li> -->
                  <li
                    class="${classNames({
                      '-header--nav-main-selected':
                        tags?.includes('contact-page'),
                    })}"
                    itemscope
                    itemtype="https://schema.org/SiteNavigationElement"
                  >
                    <a href="/contact/" itemprop="url"
                      ><span itemprop="name">Contact</span></a
                    >
                  </li>
                  <li
                    class="${classNames({
                      '-header--nav-main-selected': tags?.includes('blog'),
                    })}"
                    itemscope
                    itemtype="https://schema.org/SiteNavigationElement"
                  >
                    <a href="/blog/" itemprop="url"
                      ><span itemprop="name">Blog</span></a
                    >
                  </li>
                </ul>
              </nav>
              <nav aria-label="Social Networks" class="-header--nav-social">
                <ul>
                  <li>
                    <a
                      class="-header--nav-social-github"
                      href="//github.com/stevenvachon"
                      rel="external me noopener"
                      target="_blank"
                      >GitHub</a
                    >
                  </li>
                  <li>
                    <a
                      class="-header--nav-social-x"
                      href="//x.com/stevenvachon"
                      rel="external me noopener"
                      target="_blank"
                      >X/Twitter</a
                    >
                  </li>
                  <!-- <li>
                    <a
                      class="-header--nav-social-linkedin"
                      href="//linkedin.com/in/stevenvachon"
                      rel="external me noopener"
                      target="_blank"
                      >LinkedIn</a>
                  </li> -->
                </ul>
              </nav>
            `
          : ''}
      </header>
      <hr />
      ${!tags?.includes('error-page')
        ? html`
            <div class="sv pixels" role="presentation">
              <projectile-pixels
                direction="${projectiles || 'rtl'}"
              ></projectile-pixels>
            </div>
          `
        : ''}
      ${content}
      <hr />
      <footer class="sv footer">
        <span class="-footer--legal">
          &copy; <time>1999</time>&ndash;<time
            >${dateYear(site.lastModified)}</time
          ><span class="sv hidden"> Steven Vachon</span>.
          <a
            class="-footer--link"
            href="//creativecommons.org/licenses/by-nc-nd/4.0/deed.en"
            rel="external license noopener"
            target="_blank"
            >Some rights reserved</a
          >.
        </span>
        <span class="-footer--technical">
          Valid
          <a
            class="-footer--link"
            href="//validator.w3.org/check?uri=${encodeURIComponent(
              site.url
            )}${encodeURIComponent(page.url)}"
            rel="external noopener"
            target="_blank"
            ><abbr>HTML</abbr></a
          >/<a
            class="-footer--link"
            href="//validator.schema.org/#url=${encodeURIComponent(
              site.url
            )}${encodeURIComponent(page.url)}"
            rel="external noopener"
            target="_blank"
            >data</a
          >. More
          <a class="-footer--link" href="/blog/modern-way-to-build-a-website/"
            >about this site</a
          >.
        </span>
      </footer>
      <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@id": "${site.url}",
              "@type": "Person",
              "name": "Steven Vachon",
              "sameAs": [
                "//github.com/stevenvachon",
                "//linkedin.com/in/stevenvachon",
                "//www.npmjs.com/~stevenvachon",
                "//stackoverflow.com/users/923745/steven-vachon",
                "//x.com/stevenvachon"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "copyrightHolder": {
                "@id": "${site.url}"
              },
              "copyrightYear": 1999,
              "creator": {
                "@id": "${site.url}"
              },
              "license": "//creativecommons.org/licenses/by-nc-nd/4.0/deed.en",
              "maintainer": {
                "@id": "${site.url}"
              },
              "name": "Steven Vachon",
              "url": "${site.url}"
            }
          ]
        }
      </script>
    </body>
  </html>
`;
