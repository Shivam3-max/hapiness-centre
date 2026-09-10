"use client";
import Link from "next/link";
import { useMemo } from "react";
import { TILES, STORY_COUNT, TOTAL_KG_LOST } from "@/data/stories";
import FreeBadge from "./FreeBadge";

/** C — THROUGH. The photographs live inside the letterforms. */
export default function HeroThrough() {
  const strips = useMemo(() => TILES.slice(0, 9).map((t) => t.view.after.src), []);

  // nine vertical slices composed into one background, then clipped to the type
  const collage = {
    backgroundImage: strips.map((s) => `url(${s})`).join(", "),
    backgroundSize: `${100 / strips.length}% 100%`,
    backgroundPosition: strips.map((_, i) => `${(i / (strips.length - 1)) * 100}% center`).join(", "),
  } as const;

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-forest pt-[76px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]"
           style={{ backgroundImage: "repeating-linear-gradient(90deg,#fff 0 1px,transparent 1px 96px)" }} />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="flex items-center gap-5">
          <span className="h-px w-14 bg-amber" />
          <p className="eyebrow text-amber">Zirakpur · Wellness club &amp; community</p>
        </div>

        <h1 className="mt-8">
          <span className="sr-only">Happiness Centre — you don’t get a diet, you get a day</span>
          <span aria-hidden className="poster uppercase through block text-[clamp(4rem,20.5vw,20rem)] leading-[0.78]" style={collage}>
            Happiness
          </span>
          <span aria-hidden className="outline poster uppercase -mt-[0.06em] block text-[clamp(2.6rem,13.4vw,13rem)] leading-[0.8]"
                style={{ ["--sw" as string]: "clamp(1px,0.3vw,4px)", ["--sc" as string]: "var(--color-amber)" }}>
            is a day
          </span>
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-[48ch] text-[1.05rem] leading-relaxed text-white/70">
            Not a diet chart. A whole day — meals, movement, a morning ritual and our own
            products — built around your body, and repeated until it stops feeling like
            effort. The first one is on us.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/free-day" className="rounded-full bg-amber px-8 py-4 text-[0.92rem] font-semibold text-forest transition-colors hover:bg-white">
              Start your free day
            </Link>
            <Link href="/transformations" className="rounded-full border border-white/35 px-8 py-4 text-[0.92rem] font-semibold text-white transition-colors hover:bg-white/10">
              {STORY_COUNT} stories
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-14 flex w-full max-w-[1600px] flex-wrap items-center gap-x-12 gap-y-5 border-t border-white/15 px-5 pt-7 sm:px-8">
        {[[String(STORY_COUNT), "people photographed"], [`${TOTAL_KG_LOST} kg`, "shed between them"], ["7:00 am", "doors open"], ["6:30 pm", "class, online"]].map(([n, l]) => (
          <div key={l}>
            <p className="poster uppercase tnum text-[1.7rem] leading-none text-amber">{n}</p>
            <p className="mt-2 text-[0.62rem] uppercase tracking-[0.16em] text-white/45">{l}</p>
          </div>
        ))}
        <FreeBadge className="ml-auto hidden h-24 w-24 [&_text]:fill-white sm:grid" />
      </div>
    </section>
  );
}
