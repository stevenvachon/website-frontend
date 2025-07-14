import { html } from '../scripts/util/index.js';

export const data = {
  layout: 'main.11ty.js',
  tags: ['contact-page'],
  title: 'Contact',
};

export default ({ tags }) => html`
  <main class="sv contact" itemscope itemtype="https://schema.org/ContactPage">
    <div class="sv pane" role="presentation"></div>
    ${tags?.includes('contact-page-sent')
      ? html`
          <dialog class="sv modal" open>
            <div class="-contact--sent">
              <span
                data-text-effect="typewriter"
                data-text-effect-stagger="0.05"
                >Message Sent!</span
              >
            </div>
          </dialog>
        `
      : ''}
    <article
      class="-contact--content"
      ${tags?.includes('contact-page-sent') ? html`inert` : ''}
      itemprop="mainContentOfPage"
    >
      ${tags?.includes('contact-page-sent')
        ? html`<h1>Getting in touch</h1>`
        : html`<h1
            data-text-effect="pixelate-fade"
            data-text-effect-by="chars"
            data-text-effect-duration="0.25"
            data-text-effect-stagger="0.025"
          >
            Getting in contact
          </h1>`}
      <p>
        Please, tell me about your project and I'll try to get back to you as
        soon as I can.
      </p>
      <p>
        I can be reached via social networks or by filling out the email form.
      </p>
      <ul>
        <li>
          <a
            class="-contact--content-linkedin"
            href="//linkedin.com/in/stevenvachon"
            rel="external me noopener"
            target="_blank"
            >Connect with me on LinkedIn</a
          >
        </li>
        <li>
          <a
            class="-contact--content-x"
            href="//x.com/stevenvachon"
            rel="external me noopener"
            target="_blank"
            >Follow me on X</a
          >
        </li>
        <li>
          <a
            class="-contact--content-github"
            href="//github.com/stevenvachon"
            rel="external me noopener"
            target="_blank"
            >Check out my <strong>GitHub</strong> projects</a
          >
        </li>
      </ul>
    </article>
    <form
      action="//api.svachon.com/email"
      class="-contact--form"
      method="post"
      ${tags?.includes('contact-page-sent') ? html`inert` : ''}
    >
      <input name="redirect" type="hidden" value="/contact/sent/" />
      <div class="sv input">
        <label for="name">Name</label>
        <input id="name" maxlength="100" name="name" required type="text" />
      </div>
      <div class="sv input">
        <label for="email">Email Address</label>
        <input id="email" maxlength="100" name="email" required type="email" />
      </div>
      <div class="sv input">
        <label for="message">Comments / Questions</label>
        <textarea
          id="message"
          maxlength="10000"
          name="message"
          required
        ></textarea>
      </div>
      <button class="sv btn" type="submit">
        <span class="-chevrons">Send Message</span>
      </button>
    </form>
  </main>
`;
