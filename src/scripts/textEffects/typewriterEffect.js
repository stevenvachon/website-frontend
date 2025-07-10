import Typed from 'typed.js';

/**
 * @param {Object} config
 * @param {number} config.delay Seconds before starting
 * @param {number} config.stagger Seconds between each segment's animation
 * @param {HTMLElement} config.target
 */
export default ({ delay, stagger, target }) => {
  const { innerHTML } = target;
  target.innerHTML = '';
  new Typed(target, {
    autoInsertCss: false,
    cursorChar: '▌', // https://www.compart.com/en/unicode/block/U+2580
    onComplete: (self) => {
      self.destroy();
      target.innerHTML = innerHTML;
    },
    startDelay: delay * 1_000,
    strings: [innerHTML],
    typeSpeed: stagger * 1_000,
  });
};
