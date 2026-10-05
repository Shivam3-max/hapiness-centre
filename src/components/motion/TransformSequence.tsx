"use client";
import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scrollStore";
import { useFormation } from "../stage/useFormation";
import { STORIES, kgLabel } from "@/data/stories";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
/** Per-story scroll budget, in viewport heights. */
const BEAT_VH = 78;

/**
 * One person at a time. Within each person's scroll segment the BEFORE lands
 * first, then the AFTER wipes across it inside the same frame, so the change
 * happens in place rather than as two pictures side by side.
 */
export default function TransformSequence() {
  const section = useFormation<HTMLElement>("arc");
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const afters = useRef<(HTMLDivElement | null)[]>([]);
  const metas = useRef<(HTMLDivElement | null)[]>([]);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const n = STORIES.length;

    return subscribeScroll(() => {
      const r = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = clamp01(-r.top / travel);
      const t = p * n;
      const active = Math.min(n - 1, Math.floor(t));

      for (let i = 0; i < n; i++) {
        const card = cards.current[i];
        if (!card) continue;
        const s = t - i;                       // 0..1 while this story is on
        const onScreen = s > -0.3 && s < 1.3;
        card.style.visibility = onScreen ? "visible" : "hidden";
        if (!onScreen) {
          // the meta is a sibling, so it has to be hidden here too — skipping
          // it leaves the last number on screen under the next person's
          const stale = metas.current[i];
          if (stale && stale.style.visibility !== "hidden") {
            stale.style.visibility = "hidden";
            stale.style.opacity = "0";
          }
          continue;
        }

        // short cross-dissolve: the previous person is gone before the next
        // arrives, otherwise two full-bleed cards stack in the same place
        const vis = s < 0 ? clamp01(1 + s / 0.28) : s > 1 ? clamp01(1 - (s - 1) / 0.28) : 1;
        card.style.opacity = String(vis);
        card.style.zIndex = s >= 0 && s <= 1 ? "2" : "1";
        card.style.transform =
          `translate3d(0, ${(0.5 - Math.min(1, Math.max(0, s))) * 5}rem, 0) ` +
          `scale(${0.94 + vis * 0.06}) rotate(${(s - 0.5) * 1.1}deg)`;

        // the after wipes across once the before has been read
        const reveal = clamp01((Math.min(1, Math.max(0, s)) - 0.34) / 0.3);
        const a = afters.current[i];
        if (a) a.style.clipPath = `inset(0 0 0 ${(1 - reveal) * 100}%)`;

        const m = metas.current[i];
        if (m) {
          m.style.opacity = String(reveal * vis);   // never two numbers at once
          m.style.visibility = reveal * vis > 0.01 ? "visible" : "hidden";
          m.style.transform = `translate3d(0, ${(1 - reveal) * 1.2}rem, 0)`;
        }
      }

      if (counter.current) counter.current.textContent = String(active + 1).padStart(2, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    });
  }, [section]);

  return (
    <section ref={section} className="relative" style={{ height: `${STORIES.length * BEAT_VH + 80}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-[76px]">
        <div className="flex w-full max-w-[22rem] flex-col items-center sm:max-w-[25rem]">
          <div className="relative aspect-[1/2] h-[52svh] max-h-[560px]">
            {STORIES.map((st, i) => {
              const v = st.views[0];
              return (
                <div key={st.id} ref={(node) => { cards.current[i] = node; }}
                     className="absolute inset-0 will-change-[opacity,transform]"
                     style={{ visibility: "hidden" }}>
                  <div className="relative h-full w-full overflow-hidden border border-hairline bg-white shadow-[0_30px_90px_-40px_rgba(31,77,17,.45)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.before.src} alt="" loading="lazy" decoding="async"
                         className="absolute inset-0 h-full w-full object-contain" />
                    <div ref={(node) => { afters.current[i] = node; }} className="absolute inset-0 will-change-[clip-path]"
                         style={{ clipPath: "inset(0 0 0 100%)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={v.after.src} alt="" loading="lazy" decoding="async"
                           className="h-full w-full object-contain" />
                    </div>
                    <span aria-hidden className="absolute -top-px -left-px h-3 w-3 border-l border-t border-amber" />
                    <span aria-hidden className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-amber" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* the number lands with the after */}
          <div className="relative mt-6 h-20 w-full text-center">
            {STORIES.map((st, i) => (
              <div key={st.id} ref={(node) => { metas.current[i] = node; }}
                   className="absolute inset-x-0 top-0 will-change-[opacity,transform]"
                   style={{ opacity: 0, visibility: "hidden" }}>
                <p className="poster tnum text-[clamp(2.4rem,7vw,3.6rem)] leading-none text-forest">
                  {kgLabel(st.kg)}
                </p>
                <p className="mt-2 text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                  {st.goalLabel} · {st.months} months
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-[5vh] flex w-full max-w-[22rem] items-center gap-4 px-1">
          <span className="tnum text-[0.7rem] tracking-[0.16em] text-muted">
            <span ref={counter}>01</span> / {String(STORIES.length).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-hairline">
            <span ref={bar} className="block h-px origin-left bg-amber" style={{ transform: "scaleX(0)" }} />
          </span>
        </div>
      </div>
    </section>
  );
}
