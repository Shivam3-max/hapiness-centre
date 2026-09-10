"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-in reveal. Bails out entirely when motion is off or when the page is
 * frozen for screenshots — never leaves content stranded invisible.
 */
export default function Reveal({
  children,
  y = 22,
  delay = 0,
  stagger = 0.07,
  selector,
  className = "",
}: {
  children: ReactNode;
  y?: number;
  delay?: number;
  stagger?: number;
  selector?: string;
  className?: string;
}) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (document.documentElement.hasAttribute("data-still")) return;
    const node = el.current;
    if (!node) return;

    const targets = selector ? node.querySelectorAll(selector) : [node];
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.9,
        delay,
        stagger,
        ease: "expo.out",
        scrollTrigger: { trigger: node, start: "top 88%", once: true },
      });
    }, node);

    return () => ctx.revert();
  }, [y, delay, stagger, selector]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}
