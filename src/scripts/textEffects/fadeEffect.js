/**
 * @param {Object} config
 * @param {number} config.delay Seconds before starting
 * @param {number} config.duration In seconds (excluding the delay)
 * @param {HTMLElement[]} config.segments
 * @param {number} config.stagger Seconds between each segment's animation
 */
export default ({ delay, duration, segments, stagger }) => {
  for (const segment of segments) {
    segment.style.opacity = 0;
  }

  const animations = segments.map((segment, i) =>
    segment.animate(
      { opacity: [0, 1] },
      {
        delay: (delay + stagger * i) * 1_000,
        duration: duration * 1_000,
        fill: 'forwards',
      }
    )
  );

  return {
    animations,
    finished: Promise.all(animations.map((a) => a.finished)).then(() => {
      for (const segment of segments) {
        segment.style.opacity = '';
      }
    }),
  };
};
