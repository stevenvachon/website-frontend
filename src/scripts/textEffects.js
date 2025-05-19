import {
  ignoredWarning,
  numberError,
  stringError,
  watchForReadyElements,
} from './util/index.js';
import splitting from 'splitting';
import Typed from 'typed.js';
import { UAParser } from 'ua-parser-js';

export const FADE_EFFECT = 'fade';
export const PIXELATE_FADE_EFFECT = 'pixelate-fade';
export const TYPEWRITER_EFFECT = 'typewriter';

export const SPLIT_BY_CHARS = 'chars';
export const SPLIT_BY_WORDS = 'words';

export const TEXT_EFFECT_ATTR = 'data-text-effect';
export const TEXT_EFFECT_BY_ATTR = 'data-text-effect-by';
export const TEXT_EFFECT_DELAY_ATTR = 'data-text-effect-delay';
export const TEXT_EFFECT_DURATION_ATTR = 'data-text-effect-duration';
export const TEXT_EFFECT_STAGGER_ATTR = 'data-text-effect-stagger';

const fadeEffect = async ({ delay, duration, segments, stagger }) => {
  for (const segment of segments) {
    segment.style.opacity = 0;
  }

  await Promise.all(
    segments.map(
      (segment, i) =>
        segment.animate(
          { opacity: [0, 1] },
          {
            delay: (delay + stagger * i) * 1_000,
            duration: duration * 1_000,
            fill: 'forwards',
          }
        ).finished
    )
  );

  for (const segment of segments) {
    segment.style.opacity = '';
  }
};

const pixelateFadeEffect = async ({
  delay,
  duration,
  segments,
  stagger,
  target,
}) => {
  const ns = 'http://www.w3.org/2000/svg';
  // Avoid conflicts with other effects (ultimately sharing the same char indexes)
  const uuid = crypto.randomUUID();
  const createFilter = (index) =>
    Array.from(
      document.createRange().createContextualFragment(
        `<svg xmlns="${ns}">${[
          `<filter id="pixelateFilter-${uuid}-${index}">`,
          '<feFlood x="4" y="4" height="1" width="1" />',
          `<feComposite id="composite-${uuid}-${index}" />`,
          '<feTile result="a" />',
          '<feComposite in="SourceGraphic" in2="a" operator="in" />',
          `<feMorphology id="morphology-${uuid}-${index}" operator="dilate" />`,
          '</filter>',
          // prettier-ignore
          `<animate href="#composite-${uuid}-${index}" attributeName="width" from="15" to="1" begin="${delay + stagger * index}s" dur="${duration}s" fill="freeze" />`,
          // prettier-ignore
          `<animate href="#composite-${uuid}-${index}" attributeName="height" from="15" to="1" begin="${delay + stagger * index}s" dur="${duration}s" fill="freeze" />`,
          // prettier-ignore
          `<animate href="#morphology-${uuid}-${index}" attributeName="radius" from="7" to="0" begin="${delay + stagger * index}s" dur="${duration}s" fill="freeze" />`,
        ].join('')}</svg>`
      ).firstElementChild.children
    );

  const pixelateFilters = document.createElementNS(ns, 'svg');
  pixelateFilters.inert = true; // Doesn't seem to work
  pixelateFilters.style.pointerEvents = 'none';
  pixelateFilters.style.position = 'absolute';
  pixelateFilters.append(...segments.map((_, i) => createFilter(i)).flat());
  target.append(pixelateFilters);

  segments.forEach((segment, i) => {
    segment.style.filter = `url(#pixelateFilter-${uuid}-${i})`;
  });

  await fadeEffect({ delay, duration, segments, stagger });

  for (const segment of segments) {
    segment.style.filter = '';
  }

  pixelateFilters.remove();
};

const typewriterEffect = ({ delay, stagger, target }) => {
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

export default () =>
  watchForReadyElements(`[${TEXT_EFFECT_ATTR}]`, async (target) => {
    const originalOptions = {
      by: target.dataset.textEffectBy,
      delay: target.dataset.textEffectDelay,
      duration: target.dataset.textEffectDuration,
      effect: target.dataset.textEffect,
      stagger: target.dataset.textEffectStagger,
    };

    const { by = SPLIT_BY_CHARS } = originalOptions;
    let { delay = 0, duration = 0.5, effect, stagger = 0.1 } = originalOptions;

    if (
      stringError(
        effect,
        [FADE_EFFECT, PIXELATE_FADE_EFFECT, TYPEWRITER_EFFECT],
        TEXT_EFFECT_ATTR
      ) ||
      stringError(by, [SPLIT_BY_CHARS, SPLIT_BY_WORDS], TEXT_EFFECT_BY_ATTR) ||
      numberError(delay, TEXT_EFFECT_DELAY_ATTR) ||
      numberError(duration, TEXT_EFFECT_DURATION_ATTR) ||
      numberError(stagger, TEXT_EFFECT_STAGGER_ATTR)
    ) {
      return;
    }

    if (effect === PIXELATE_FADE_EFFECT) {
      const {
        browser: { name: browserName },
        os: { name: osName },
      } = UAParser(navigator.userAgent);
      // All iOS web browsers use Safari's rendering engine, and it doesn't support the pixelate filter
      if (browserName === 'Safari' || osName === 'iOS') {
        effect = FADE_EFFECT;
      }
    }

    delay = parseFloat(delay);
    duration = parseFloat(duration);
    stagger = parseFloat(stagger);

    let originalHTML, segments;
    if (effect === FADE_EFFECT || effect === PIXELATE_FADE_EFFECT) {
      originalHTML = target.innerHTML;

      splitting({ by, target });

      segments = Array.from(
        target.querySelectorAll(
          by === SPLIT_BY_CHARS ? '.char' : by === SPLIT_BY_WORDS ? '.word' : ''
        )
      );
    }

    if (effect === FADE_EFFECT) {
      await fadeEffect({ delay, duration, segments, stagger });
    } else if (effect === PIXELATE_FADE_EFFECT) {
      await pixelateFadeEffect({ delay, duration, segments, stagger, target });
    } else if (effect === TYPEWRITER_EFFECT) {
      if (originalOptions.by) {
        ignoredWarning(TEXT_EFFECT_BY_ATTR, effect);
      }
      if (originalOptions.duration) {
        ignoredWarning(TEXT_EFFECT_DURATION_ATTR, effect);
      }
      await typewriterEffect({ delay, stagger, target });
    }

    if (originalHTML) {
      target.innerHTML = originalHTML;
    }
  });
