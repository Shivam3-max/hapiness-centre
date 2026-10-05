/**
 * How visible a step is, given how far the scroll position is from it.
 *
 * A plain `1 - d` ramp means the text is only ever fully sharp at one exact
 * scroll position, so it reads as blurred almost all the time. This holds each
 * step completely sharp across a plateau, then fades quickly.
 */
export const HOLD = 0.4;   // fully sharp within this distance
export const FADE = 0.42;  // and gone this much further out

export function visibility(distance: number) {
  const d = Math.abs(distance);
  if (d <= HOLD) return 1;
  return Math.max(0, 1 - (d - HOLD) / FADE);
}

/** Max blur in px — enough to separate the layers, not enough to smear them. */
export const MAX_BLUR = 4;
