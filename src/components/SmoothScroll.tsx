"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis owns the scroll position once mounted — read progress from the
 * instance, never from window.scrollY, which stops tracking reality here.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (document.documentElement.hasAttribute("data-still")) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let frame = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
