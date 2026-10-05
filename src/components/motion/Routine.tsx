"use client";
import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scrollStore";
import { useFormation } from "../stage/useFormation";
import Placeholder from "./Placeholder";
import { ROUTINE } from "@/data/routine";

/** The day itself. Time and image cross-fade together as you scroll. */
export default function Routine() {
  const section = useFormation<HTMLElement>("ring");
  const texts = useRef<(HTMLDivElement | null)[]>([]);
  const shots = useRef<(HTMLDivElement | null)[]>([]);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const n = ROUTINE.length;

    return subscribeScroll(() => {
      const r = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / travel));
      const local = p * (n - 1 + 0.001);

      texts.current.forEach((node, i) => {
        if (!node) return;
        const vis = Math.max(0, 1 - Math.abs(local - i) * 1.35);
        node.style.opacity = String(vis);
        node.style.transform = `translate3d(0, ${(local - i) * -1.6}rem, 0)`;
      });
      shots.current.forEach((node, i) => {
        if (!node) return;
        const d = local - i;
        const vis = Math.max(0, 1 - Math.abs(d) * 1.2);
        node.style.opacity = String(vis);
        node.style.transform = `translate3d(0, ${d * -3}%, 0) scale(${1 + (1 - vis) * 0.05})`;
        node.style.clipPath = `inset(${Math.max(0, d * 42)}% 0 ${Math.max(0, -d * 42)}% 0)`;
      });
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    });
  }, [section]);

  return (
    <section ref={section} className="relative" style={{ height: `${ROUTINE.length * 92 + 60}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.82fr] lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <p className="eyebrow">A day at the centre</p>
            <div className="relative mt-7 h-[13rem] sm:h-[14rem]">
              {ROUTINE.map((b, i) => (
                <div key={b.time} ref={(node) => { texts.current[i] = node; }}
                     className="absolute inset-0 will-change-[opacity,transform]"
                     style={{ opacity: i === 0 ? 1 : 0 }}>
                  <p className="poster tnum text-[clamp(2.6rem,7vw,5rem)] leading-none text-amber-deep">{b.time}</p>
                  <h3 className="editor mt-4 text-[clamp(1.7rem,3.4vw,2.9rem)] leading-tight text-forest">{b.title}</h3>
                  <p className="mt-3 max-w-[32ch] text-[0.98rem] leading-relaxed text-muted">{b.line}</p>
                </div>
              ))}
            </div>
            <span className="mt-8 block h-px w-full max-w-[22rem] bg-hairline">
              <span ref={bar} className="block h-px origin-left bg-amber" style={{ transform: "scaleX(0)" }} />
            </span>
          </div>

          <div className="relative order-1 aspect-4/5 w-full max-w-[26rem] justify-self-center lg:order-2 lg:max-w-none">
            {ROUTINE.map((b, i) => (
              <div key={b.time} ref={(node) => { shots.current[i] = node; }}
                   className="absolute inset-0 will-change-[opacity,transform,clip-path]"
                   style={{ opacity: i === 0 ? 1 : 0 }}>
                <Placeholder fig={String(i + 1).padStart(2, "0")} caption={b.caption} className="h-full w-full" src={b.src} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
