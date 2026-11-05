/** The showcase slides, in order (public/media/[ro/]slides/<name>.jpg, made by capture/slides.mjs). */
export const SLIDES = [
  "01-plan",
  "02-whats-left",
  "03-safe-pace",
  "04-savings",
  "05-guest-or-account",
  "06-dark-mode",
];

// The track holds a copy of the last slide before the first and a copy of the
// first after the last; landing on a copy jumps (instantly, unseen) to the
// real slide, so it loops forever in both directions, one slide at a time.
export const TRACK = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]];

/** The real slide shown at a track position. */
export const slideAt = (position: number) => (position - 1 + SLIDES.length) % SLIDES.length;

/** Whether a track position is one of the two copies. */
export const isCopyAt = (position: number) => position === 0 || position === TRACK.length - 1;
