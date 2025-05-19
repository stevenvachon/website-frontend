import classNames from 'classnames';
import { dateFull, dateISO, html } from '../scripts/util/index.js';

export const data = {
  layout: 'blog.11ty.js',
};

export default ({ content, date, tags, title }) => html`
  <article
    class="sv blog-post"
    itemscope
    itemtype="https://schema.org/BlogPosting"
  >
    <header>
      <h1 class="-blog-post--title" itemprop="headline">${title}</h1>
      <time
        class="-blog-post--date"
        datetime="${dateISO(date)}"
        itemprop="datePublished"
      >
        ${dateFull(date)}
      </time>
    </header>
    <div
      class="${classNames({
        '-blog-post--content': true,
        'with-numbered-headers': tags?.includes('numbered-headers'),
      })}"
      itemprop="articleBody"
    >
      ${content}
    </div>
    <section class="-blog-post--comments">
      <div id="disqus_thread">
        <noscript>
          Please enable JavaScript to view the
          <a
            class="sv link"
            href="//disqus.com/?ref_noscript"
            rel="external nofollow"
          >
            comments powered by Disqus</a
          >.
        </noscript>
      </div>
    </section>
  </article>
`;
