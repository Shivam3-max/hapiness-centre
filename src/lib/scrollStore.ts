"use client";

/**
 * One scroll source for the whole page.
 *
 * The WebGL stage, the day clock and every pinned sequence read from here
 * instead of each attaching their own listener — one rAF loop, one layout
 * read per frame, no listener pile-up on a page this long.
 */
type Listener = (s: ScrollState) => void;

export type ScrollState = {
  /** 0..1 down the whole document */
  progress: number;
  /** pixels */
  y: number;
  /** viewport height */
  vh: number;
  /** smoothed -1..1, negative = scrolling up */
  velocity: number;
};

const state: ScrollState = { progress: 0, y: 0, vh: 1, velocity: 0 };
const listeners = new Set<Listener>();
let running = false;
let frame = 0;
let lastY = 0;

function tick() {
  const y = window.scrollY || document.documentElement.scrollTop || 0;
  const vh = window.innerHeight || 1;
  const max = Math.max(1, document.documentElement.scrollHeight - vh);

  const raw = (y - lastY) / Math.max(1, vh);
  lastY = y;

  state.y = y;
  state.vh = vh;
  state.progress = Math.min(1, Math.max(0, y / max));
  state.velocity += (Math.max(-1, Math.min(1, raw * 6)) - state.velocity) * 0.12;

  for (const fn of listeners) fn(state);
  frame = requestAnimationFrame(tick);
}

export function subscribeScroll(fn: Listener) {
  listeners.add(fn);
  if (!running) {
    running = true;
    lastY = window.scrollY || 0;
    frame = requestAnimationFrame(tick);
  }
  fn(state);
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) {
      running = false;
      cancelAnimationFrame(frame);
    }
  };
}

export const getScroll = () => state;

/** Progress of one element through the viewport, 0 before it enters, 1 after it leaves. */
export function elementProgress(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  return Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
}
