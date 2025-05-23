import { html } from '../scripts/util/index.js';

export const data = {
  eleventyExcludeFromCollections: true,
  layout: 'main.11ty.js',
  permalink: '/404.html',
  robots: ['nofollow', 'noindex'],
  tags: ['error-page'],
  title: 'Page Not Found',
};

export default () => html`
  <style>
    body {
      text-align: center;
    }

    h1 {
      color: var(--yellow);
      font-size: 2rem;
      font-weight: bold;
      line-height: 1.2;
      margin-bottom: 2rem;
      text-transform: lowercase;
    }

    h1:first-letter {
      text-transform: uppercase;
    }

    h2 {
      margin-top: 1rem;
    }

    img {
      margin: 1rem 0;
      pointer-events: none;
    }

    ol {
      counter-reset: li;
      margin-bottom: 3rem !important;
    }

    ol li {
      counter-increment: li;
      display: block;
    }

    ol li::before {
      color: var(--yellow);
      content: counter(li) '. ';
      font-weight: bold;
    }
  </style>
  <main class="sv main">
    <article>
      <h1>That Page Doesn't Exist!</h1>
      <div class="sv content">
        <p>
          But, maybe
          <a
            class="sv link"
            href="//www.google.com/mentalplex/"
            rel="external noopener"
            target="_blank"
            >Google MentalPlex</a
          >™ can help.
        </p>
        <img
          alt="MentalPlex circle"
          height="214"
          src="/images/mentalplex.svg"
          width="215"
        />
        <h2>Instructions</h2>
        <ol>
          <li>Remove hat and glasses.</li>
          <li>
            Peer into MentalPlex circle. <strong>Do not move your head.</strong>
          </li>
          <li>Project mental image of what you want to find.</li>
          <li>Click or visualize clicking within the MentalPlex circle.</li>
        </ol>
        <p>
          When you're done with that, perhaps you should go
          <a class="sv link" href="/">home</a>. 😜
        </p>
      </div>
    </article>
  </main>
`;
