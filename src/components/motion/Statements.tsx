"use client";
import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scrollStore";
import { useFormation } from "../stage/useFormation";

/**
 * One sentence at a time. Scroll drives a cross-fade through the set — the
 * section is tall, the inner panel is `position: sticky`.
 *
 * Deliberately NOT ScrollTrigger pin: pinning re-parents the node and React
 * then cannot unmount it (see ADay).
 */
export default function Statements({
  eyebrow, lines,
}: { eyebrow: string; lines: { text: string; accent?: string }[] }) {
  const section = useFormation<HTMLElement>("scatter");
  const items = useRef<(HTMLParagraphElement | null)[]>([]);
  const dashes = useRef<(HTMLSpanElement | null)[]>([]);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const n = lines.length;

    return subscribeScroll(() => {
      const r = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / travel));
      const local = p * (n - 1 + 0.001);
      const active = Math.min(n - 1, Math.round(local));

      items.current.forEach((node, i) => {
        if (!node) return;
        const vis = Math.max(0, 1 - Math.abs(local - i) * 1.25);
        node.style.opacity = String(vis);
        node.style.transform = `translate3d(0, ${(local - i) * -2.2}rem, 0) scale(${0.97 + vis * 0.03})`;
        node.style.filter = `blur(${(1 - vis) * 9}px)`;
      });
      dashes.current.forEach((s, i) => {
        if (s) s.style.opacity = i === active ? "1" : "0.26";
      });
      if (counter.current) counter.current.textContent = String(active + 1).padStart(2, "0");
    });
  }, [lines.length, section]);

  return (
    <section ref={section} className="relative" style={{ height: `${lines.length * 95 + 60}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-5">
        <p className="eyebrow absolute top-[17vh]">{eyebrow}</p>

        <div className="relative flex w-full max-w-[17ch] items-center justify-center sm:max-w-[24ch] lg:max-w-[30ch]">
          {lines.map((l, i) => (
            <p
              key={l.text}
              ref={(node) => { items.current[i] = node; }}
              className="editor absolute w-full text-center text-balance text-[clamp(1.75rem,4.4vw,3.6rem)] leading-[1.08] text-forest will-change-[opacity,transform,filter]"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {l.accent ? (<>{l.text} <em className="italic text-amber-deep">{l.accent}</em></>) : l.text}
            </p>
          ))}
        </div>

        <div className="absolute bottom-[11vh] flex items-center gap-4">
          <span className="tnum text-[0.66rem] tracking-[0.18em] text-muted">
            <span ref={counter}>01</span> / {String(lines.length).padStart(2, "0")}
          </span>
          <span className="flex items-center gap-1.5">
            {lines.map((l, i) => (
              <span key={l.text} ref={(node) => { dashes.current[i] = node; }}
                    className="h-px w-6 bg-forest transition-opacity duration-300"
                    style={{ opacity: i === 0 ? 1 : 0.26 }} />
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
