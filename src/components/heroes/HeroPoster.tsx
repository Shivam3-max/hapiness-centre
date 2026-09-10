"use client";
import Link from "next/link";
import { TILES, STORY_COUNT, TOTAL_KG_LOST } from "@/data/stories";
import FreeBadge from "./FreeBadge";

const STRIP = TILES.slice(0, 14);

/** A — POSTER. Giant stacked Anton, photographs slicing between the lines. */
export default function HeroPoster() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-canvas pt-[76px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center gap-x-6 gap-y-3 px-5 pt-6 sm:px-8">
        <span className="h-px w-14 bg-amber" />
        <p className="eyebrow">Zirakpur · Wellness club &amp; community</p>
        <p className="tnum ml-auto text-[0.68rem] uppercase tracking-[0.18em] text-muted">
          {STORY_COUNT} stories · {TOTAL_KG_LOST} kg
        </p>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <h1 className="poster uppercase text-[clamp(2.6rem,min(12.6vw,19vh),12.5rem)] text-forest">
          <span className="block">You don’t</span>
          <span className="outline block" style={{ ["--sw" as string]: "clamp(1px,0.35vw,4px)" }}>
            get a diet
          </span>
        </h1>
      </div>

      {/* the proof, cutting straight through the headline */}
      <div aria-hidden className="my-[clamp(0.75rem,1.8vh,2rem)] flex overflow-hidden">
        <div className="ticker flex shrink-0 gap-2 pr-2" style={{ ["--dur" as string]: "70s" }}>
          {[...STRIP, ...STRIP].map((t, i) => (
            <span key={i} className="relative block aspect-square h-[clamp(84px,12vh,140px)] shrink-0 border border-hairline bg-white">
              <span className="grid h-full grid-cols-2">
                {[t.view.before, t.view.after].map((s, j) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={j} src={s.src} alt="" loading={i < 6 ? "eager" : "lazy"}
                       className="h-full w-full object-cover object-top" />
                ))}
              </span>
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-amber" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <h2 className="poster uppercase text-[clamp(2.6rem,min(12.6vw,19vh),12.5rem)] text-forest">
          <span className="block">
            You get <em className="not-italic text-amber-deep">a day</em>
            <span className="text-amber">.</span>
          </span>
        </h2>
      </div>

      <div className="mx-auto mt-auto flex w-full max-w-[1600px] flex-wrap items-end gap-8 px-5 pb-8 pt-[clamp(1rem,2.5vh,2.5rem)] sm:px-8">
        <p className="max-w-[38ch] text-[1rem] leading-relaxed text-muted">
          Meals, movement, a morning ritual and our own products — one complete day,
          built around your body. Come and live the first one on us.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/free-day" className="rounded-full bg-forest px-8 py-4 text-[0.92rem] font-semibold text-white transition-colors hover:bg-bark">
            Start your free day
          </Link>
          <Link href="/transformations" className="rounded-full border border-forest px-8 py-4 text-[0.92rem] font-semibold text-forest transition-colors hover:bg-mist">
            {STORY_COUNT} stories
          </Link>
        </div>
        <FreeBadge className="ml-auto hidden h-32 w-32 lg:grid" />
      </div>
    </section>
  );
}
