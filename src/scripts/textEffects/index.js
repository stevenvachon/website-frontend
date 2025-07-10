import fadeEffect from './fadeEffect.js';
import { ignoredWarning, numberError, stringError } from '../logging/index.js';
import pixelateFadeEffect from './pixelateFadeEffect.js';
import splitting from 'splitting';
import typewriterEffect from './typewriterEffect.js';
import { UAParser } from 'ua-parser-js';
import { watchForReadyElements } from '../util/index.js';

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
      await fadeEffect({ delay, duration, segments, stagger }).finished;
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
