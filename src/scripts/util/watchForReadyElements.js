/**
 * Detect when an element is ready in the DOM.
 * @param {string} selector The selector to match.
 * @param {(element: Element) => void} callback The function to call when an element is ready.
 * @todo https://github.com/sindresorhus/element-ready/issues/52
 */
export default (selector, callback) => {
  const seen = new Set();
  let cancelled = document.readyState !== 'loading';

  if (!cancelled) {
    document.addEventListener('DOMContentLoaded', () => (cancelled = true));
  }

  const check = () => {
    for (const el of document.querySelectorAll(selector)) {
      if (!seen.has(el)) {
        seen.add(el);
        callback(el);
      }
    }
    if (!cancelled) {
      requestAnimationFrame(check);
    }
  };

  check();
};
