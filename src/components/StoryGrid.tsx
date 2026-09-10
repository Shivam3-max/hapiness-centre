"use client";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { GOALS, PROGRAMS, type Goal } from "@/data/content";
import { STORIES, kgLabel, type Story } from "@/data/stories";
import BeforeAfter from "./BeforeAfter";

gsap.registerPlugin(Flip);

type Filter = "all" | Goal;
const still = () => typeof document !== "undefined" && document.documentElement.hasAttribute("data-still");

/** Deliberately irregular — a uniform grid reads as a template. */
const SPAN = (i: number) =>
  i % 11 === 0 ? "sm:col-span-2 sm:row-span-2" : i % 7 === 3 ? "lg:row-span-2" : "";

function Card({ story, i, onOpen }: { story: Story; i: number; onOpen: () => void }) {
  const v = story.views[0];
  return (
    <button
      data-tile
      data-goal={story.goal}
      onClick={onOpen}
      className={`group relative block overflow-hidden border border-hairline bg-white text-left ${SPAN(i)}`}
      aria-label={`${story.goalLabel}, ${kgLabel(story.kg)} over ${story.months} months — open story`}
    >
      <div className="relative aspect-[3/5] w-full overflow-hidden">
        {/* after sits on top: the wall reads as success first, struggle second */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={v.before.src} alt="" loading="lazy" decoding="async"
             className="absolute inset-0 h-full w-full object-cover object-top" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={v.after.src} alt="" loading="lazy" decoding="async"
             className="absolute inset-0 h-full w-full object-cover object-top transition-[clip-path] duration-700 ease-out [clip-path:inset(0_0_0_0)] group-hover:[clip-path:inset(0_0_0_100%)] group-focus-visible:[clip-path:inset(0_0_0_100%)]" />
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-px bg-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex items-baseline justify-between gap-3 border-t border-hairline px-3.5 py-3">
        <span className="display tnum text-[1.35rem] text-forest">{kgLabel(story.kg)}</span>
        <span className="text-[0.62rem] uppercase tracking-[0.13em] text-muted">
          {story.goalLabel} · {story.months} mo
        </span>
      </div>

      <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-full bg-white/85 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-forest opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        Hold to see before
      </span>
    </button>
  );
}

function Lightbox({ story, onClose, onStep }: { story: Story; onClose: () => void; onStep: (d: number) => void }) {
  const program = PROGRAMS.find((p) => p.goal === story.goal);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Transformation story"
         className="fixed inset-0 z-[70] grid place-items-center bg-forest/25 p-4 backdrop-blur-sm">
      <button className="absolute inset-0 cursor-default" aria-label="Close" onClick={onClose} />
      <div className="relative grid max-h-[92svh] w-full max-w-[1080px] gap-0 overflow-auto border border-hairline bg-canvas md:grid-cols-[1.15fr_1fr]">
        <div className="p-3 md:p-4">
          {story.views.map((v, i) => (
            <BeforeAfter key={i} before={v.full.before} after={v.full.after}
                         className={`mx-auto aspect-[1/2] h-[56svh] ${i ? "mt-3" : ""}`} />
          ))}
        </div>

        <div className="flex flex-col justify-between border-t border-hairline p-7 md:border-l md:border-t-0 md:p-9">
          <div>
            <p className="eyebrow">{story.goalLabel}</p>
            <p className="display tnum mt-5 text-[clamp(3rem,7vw,4.6rem)] leading-none text-forest">
              {kgLabel(story.kg)}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-px bg-hairline">
              {[["Duration", `${story.months} months`], ["Age", story.ageBracket],
                ["Views", story.views.length > 1 ? "Front & side" : "Front"],
                ["Programme", program?.name ?? "—"]].map(([k, val]) => (
                <div key={k} className="bg-canvas px-4 py-3.5">
                  <dt className="text-[0.6rem] uppercase tracking-[0.14em] text-muted">{k}</dt>
                  <dd className="tnum mt-1 text-[0.92rem] font-medium text-ink">{val}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 text-[0.86rem] leading-relaxed text-muted">
              Drag the handle to compare. Results vary from person to person — these
              are individual outcomes, not a promise.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-2">
            {program && (
              <Link href={`/programs/${program.slug}`}
                    className="rounded-full bg-forest px-5 py-2.5 text-[0.8rem] font-semibold text-white hover:bg-bark">
                About {program.name}
              </Link>
            )}
            <button onClick={() => onStep(-1)} className="rounded-full border border-hairline px-4 py-2.5 text-[0.8rem] font-semibold text-forest hover:bg-mist">Previous</button>
            <button onClick={() => onStep(1)} className="rounded-full border border-hairline px-4 py-2.5 text-[0.8rem] font-semibold text-forest hover:bg-mist">Next</button>
            <button onClick={onClose} className="ml-auto text-[0.8rem] font-semibold text-muted underline underline-offset-4 hover:text-forest">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StoryGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const shown = STORIES.filter((s) => filter === "all" || s.goal === filter);

  const pick = (f: Filter) => {
    if (grid.current && !still()) {
      flipState.current = Flip.getState(grid.current.querySelectorAll("[data-tile]"));
    }
    setFilter(f);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !grid.current) return;
    flipState.current = null;
    Flip.from(state, {
      duration: 0.62,
      ease: "power2.inOut",
      absolute: true,
      scale: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.45 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.3 }),
    });
  }, [filter]);

  const step = useCallback((d: number) => {
    setOpen((cur) => (cur === null ? cur : (cur + d + shown.length) % shown.length));
  }, [shown.length]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {([{ key: "all", label: "All" }, ...GOALS] as { key: Filter; label: string }[]).map((g) => {
          const n = g.key === "all" ? STORIES.length : STORIES.filter((s) => s.goal === g.key).length;
          const on = filter === g.key;
          return (
            <button key={g.key} onClick={() => pick(g.key)} aria-pressed={on}
              className={`rounded-full border px-4 py-2 text-[0.78rem] font-semibold transition-colors ${
                on ? "border-forest bg-forest text-white" : "border-hairline text-forest hover:bg-mist"}`}>
              {g.label} <span className="tnum opacity-60">{n}</span>
            </button>
          );
        })}
      </div>

      <div ref={grid}
           className="mt-8 grid auto-rows-[minmax(0,auto)] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((s, i) => (
          <Card key={s.id} story={s} i={i} onOpen={() => setOpen(i)} />
        ))}
      </div>

      {open !== null && shown[open] && (
        <Lightbox story={shown[open]} onClose={() => setOpen(null)} onStep={step} />
      )}
    </>
  );
}
