import fadeEffect from './fadeEffect.js';
import tween from 'tween-functions'; // TODO: https://github.com/chenglou/tween-functions/issues/6

const COMPOSITE_DIMENSION_START = 15;
const MORPHOLOGY_RADIUS_START = 7;
const NAMESPACE = 'http://www.w3.org/2000/svg';

/**
 * @param {string} uuid
 * @param {number} segmentIndex
 */
const createFilter = (uuid, segmentIndex) =>
  Array.from(
    document.createRange().createContextualFragment(
      `<svg xmlns="${NAMESPACE}">${[
        `<filter id="${getFilterId(uuid, segmentIndex)}">`,
        '<feFlood x="4" y="4" height="1" width="1" />',
        // prettier-ignore
        `<feComposite id="${getCompositeId(uuid, segmentIndex)}" height="${COMPOSITE_DIMENSION_START}" width="${COMPOSITE_DIMENSION_START}" />`,
        '<feTile result="a" />',
        '<feComposite in="SourceGraphic" in2="a" operator="in" />',
        // prettier-ignore
        `<feMorphology id="${getMorphologyId(uuid, segmentIndex)}" operator="dilate" radius="${MORPHOLOGY_RADIUS_START}" />`,
        '</filter>',
      ].join('')}</svg>`
    ).firstElementChild.children
  );

/**
 * @param {string} uuid
 * @param {number} segmentIndex
 */
const getCompositeId = (uuid, segmentIndex) =>
  `composite-${uuid}-${segmentIndex}`;

/**
 * @param {string} uuid
 * @param {number} segmentIndex
 */
const getFilterId = (uuid, segmentIndex) =>
  `pixelateFilter-${uuid}-${segmentIndex}`;

/**
 * @param {string} uuid
 * @param {number} segmentIndex
 */
const getMorphologyId = (uuid, segmentIndex) =>
  `morphology-${uuid}-${segmentIndex}`;

/**
 * @param {string} uuid
 * @param {Animation[]} animations
 */
const updateFilters = (uuid, animations) =>
  new Promise((resolve) => {
    const updatePerFrame = () =>
      requestAnimationFrame(() => {
        animations.forEach(({ overallProgress }, i) => {
          if (overallProgress < 1) {
            const composite = document.getElementById(getCompositeId(uuid, i));
            const dimension = tween.linear(
              overallProgress,
              COMPOSITE_DIMENSION_START,
              1,
              1
            );
            composite.setAttribute('height', dimension);
            composite.setAttribute('width', dimension);
            document
              .getElementById(getMorphologyId(uuid, i))
              .setAttribute(
                'radius',
                tween.linear(overallProgress, MORPHOLOGY_RADIUS_START, 0, 1)
              );
          }
        });

        if (animations.every((a) => a.overallProgress === 1)) {
          resolve();
        } else {
          updatePerFrame();
        }
      });
    updatePerFrame();
  });

/**
 * @param {Object} config
 * @param {number} config.delay Seconds before starting
 * @param {number} config.duration In seconds (excluding the delay)
 * @param {HTMLElement[]} config.segments
 * @param {number} config.stagger Seconds between each segment's animation
 * @param {HTMLElement} config.target
 */
export default async ({ delay, duration, segments, stagger, target }) => {
  // Avoid conflicts with other occurrences of this effect (ultimately sharing some segment indexes)
  const uuid = crypto.randomUUID();

  const pixelateFilters = document.createElementNS(NAMESPACE, 'svg');
  pixelateFilters.style.pointerEvents = 'none';
  pixelateFilters.style.position = 'absolute';
  pixelateFilters.append(
    ...segments.map((_, i) => createFilter(uuid, i)).flat()
  );
  target.append(pixelateFilters);

  segments.forEach((segment, i) => {
    segment.style.filter = `url(#${getFilterId(uuid, i)})`;
  });

  const { animations, finished } = fadeEffect({
    delay,
    duration,
    segments,
    stagger,
  });

  await Promise.all([finished, updateFilters(uuid, animations)]);

  for (const segment of segments) {
    segment.style.filter = '';
  }

  pixelateFilters.remove();
};
