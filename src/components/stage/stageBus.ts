"use client";
import type { Formation } from "./formations";

/**
 * Sections announce which shape the field should hold; the canvas listens.
 * Decoupled so the stage never remounts when the page changes.
 */
type Listener = (f: Formation) => void;
const listeners = new Set<Listener>();
let current: Formation = "orb";

export function setFormation(f: Formation) {
  if (f === current) return;
  current = f;
  for (const fn of listeners) fn(f);
}

export function subscribeFormation(fn: Listener) {
  listeners.add(fn);
  fn(current);
  return () => void listeners.delete(fn);
}

export const getFormation = () => current;
