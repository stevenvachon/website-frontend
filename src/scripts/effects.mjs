import {
  numberError,
  stringError,
  watchForReadyElements,
} from './util/index.mjs';

export const EFFECT_ATTR = 'data-effect';
export const EFFECT_DELAY_ATTR = 'data-effect-delay';
export const EFFECT_DURATION_ATTR = 'data-effect-duration';

export const BLUR_FADE_EFFECT = 'blur-fade';
export const FADE_EFFECT = 'fade';

const blurFadeEffect = async ({ delay, duration, target }) => {
  target.style.filter = 'blur(10px) saturate(0%)';
  target.style.opacity = 0;

  await target.animate(
    {
      filter: ['blur(10px) saturate(0%)', 'blur(0px) saturate(100%)'],
      opacity: [0, 1],
    },
    {
      delay: delay * 1_000,
      duration: duration * 1_000,
      fill: 'forwards',
    }
  ).finished;

  target.style.filter = '';
  target.style.opacity = '';
};

const fadeEffect = async ({ delay, duration, target }) => {
  target.style.opacity = 0;

  await target.animate(
    { opacity: [0, 1] },
    {
      delay: delay * 1_000,
      duration: duration * 1_000,
      fill: 'forwards',
    }
  ).finished;

  target.style.opacity = '';
};

export default () =>
  watchForReadyElements(`[${EFFECT_ATTR}]`, async (target) => {
    const originalOptions = {
      delay: target.dataset.effectDelay,
      duration: target.dataset.effectDuration,
      effect: target.dataset.effect,
    };

    const { effect } = originalOptions;
    let { delay = 0, duration = 0.5 } = originalOptions;

    if (
      stringError(effect, [BLUR_FADE_EFFECT, FADE_EFFECT], EFFECT_ATTR) ||
      numberError(delay, EFFECT_DELAY_ATTR) ||
      numberError(duration, EFFECT_DURATION_ATTR)
    ) {
      return;
    }

    delay = parseFloat(delay);
    duration = parseFloat(duration);

    if (effect === BLUR_FADE_EFFECT) {
      await blurFadeEffect({ delay, duration, target });
    } else if (effect === FADE_EFFECT) {
      await fadeEffect({ delay, duration, target });
    }
  });
