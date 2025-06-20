import { html } from '../scripts/util/index.js';

export const data = {
  description: 'An expert of 20+ years in web-based software development.',
  layout: 'main.11ty.js',
  tags: ['homepage'],
  title: 'Steven Vachon: Frontend & Cloud Engineer',
};

export default () => html`
  <style>
    main {
      box-sizing: border-box;
      min-height: var(--projectile-pixels-height);
      padding: calc(var(--site-padding) * 3) calc(var(--site-padding) * 2) 0
        calc(var(--site-padding) * 2);
    }

    main h2 {
      color: var(--white);
      font-size: 2.05rem;
      font-weight: bold;
      line-height: 1.2;
      max-width: 41rem;
    }

    main h2 .-quality {
      color: var(--yellow);
      display: block;
    }

    main p {
      line-height: 1.3;
      margin-top: 3.2rem;
      max-width: 45rem;
    }

    main p strong {
      font-weight: bold;
      white-space: nowrap;
    }

    @container style(--is-at-least-tablet-size: false) {
      main {
        padding-top: var(--site-padding);
        text-align: center;
      }

      main h2 .quality {
        display: inline;
      }
    }
  </style>
  <main class="sv main" itemscope itemtype="https://schema.org/WebPage">
    <article itemprop="mainContentOfPage">
      <h2
        data-text-effect="pixelate-fade"
        data-text-effect-by="words"
        data-text-effect-delay="0.1"
        data-text-effect-stagger="0.1"
      >
        <strong itemprop="specialty">Web-based software</strong> with
        <span class="-quality">quality under the hood.</span>
      </h2>
      <p>
        <!-- TODO: https://github.com/mattboldt/typed.js/issues/624 -->
        <span data-text-effect="typewriter" data-text-effect-stagger="0.01">
          I like working. Having specialized in creating
          <strong itemprop="specialty">user interfaces</strong> for
          <time datetime="1999">20+ years</time> and
          <strong itemprop="specialty">cloud architecture</strong> for
          <time datetime="2015">10+ years</time>, I've mastered my ability to
          help build and maintain your success.
        </span>
      </p>
      <p>
        <span class="sv hidden">Check out</span>
        <a
          class="sv important btn"
          data-effect="blur-fade"
          data-effect-delay="0.75"
          data-effect-duration="1"
          href="//github.com/stevenvachon"
          itemprop="significantLink"
          rel="me external noopener"
          target="_blank"
        >
          <span class="-chevrons">my open-source projects</span>
        </a>
        <span class="sv hidden">on GitHub.</span>
      </p>
    </article>
  </main>
`;
