"use client";
import Link from "next/link";
import BeforeAfter from "../BeforeAfter";
import { STORIES, STORY_COUNT, TOTAL_KG_LOST, kgLabel } from "@/data/stories";
import FreeBadge from "./FreeBadge";

const F = STORIES[3];

/** B — EDITORIAL. High-contrast Bodoni, amber outline, life-size slider. */
export default function HeroEditorial() {
  return (
    <section className="relative min-h-[100svh] bg-cream pt-[76px]">
      <div className="mx-auto grid min-h-[calc(100svh-76px)] w-full max-w-[1600px] grid-cols-1 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="flex flex-col justify-center px-5 py-14 sm:px-8 lg:py-20 lg:pr-16">
          <div className="flex items-center gap-5">
            <span className="h-px w-14 bg-amber" />
            <p className="eyebrow">Zirakpur · Since the first free day</p>
          </div>

          <h1 className="editor mt-8 text-[clamp(2.5rem,min(7.4vw,13vh),8rem)] text-forest">
            <span className="block">You don’t get</span>
            <span className="block italic">a diet.</span>
            <span className="outline block italic" style={{ ["--sw" as string]: "clamp(1px,0.22vw,3px)" }}>
              You get a day.
            </span>
          </h1>

          <p className="mt-8 max-w-[46ch] text-[1.05rem] leading-relaxed text-muted">
            Meals, movement, a morning ritual and our own products — one complete day,
            built around your body. Come and live the first one on us.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/free-day" className="rounded-full bg-forest px-8 py-4 text-[0.92rem] font-semibold text-white transition-colors hover:bg-bark">
              Start your free day
            </Link>
            <Link href="/transformations" className="group inline-flex items-center gap-2.5 px-2 py-4 text-[0.92rem] font-semibold text-forest">
              See {STORY_COUNT} stories
              <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full border border-amber text-amber-deep transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-14 gap-y-6 border-t border-hairline pt-7">
            {[[String(STORY_COUNT), "documented stories"], [`${TOTAL_KG_LOST}`, "kilos, between them"], ["1", "free day, no card"]].map(([n, l]) => (
              <div key={l}>
                <dt className="editor tnum text-[2.2rem] leading-none text-forest">{n}</dt>
                <dd className="mt-2 text-[0.66rem] uppercase tracking-[0.16em] text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative border-hairline lg:border-l">
          <BeforeAfter
            before={F.views[0].full.before}
            after={F.views[0].full.after}
            className="h-[62svh] w-full border-0 lg:h-full"
          />
          <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
            <span className="bg-forest px-4 py-2.5">
              <span className="editor tnum block text-[1.7rem] leading-none text-amber">{kgLabel(F.kg)}</span>
              <span className="mt-1 block text-[0.58rem] uppercase tracking-[0.16em] text-white/65">
                {F.months} months · {F.goalLabel}
              </span>
            </span>
            <FreeBadge className="hidden h-24 w-24 sm:grid" />
          </div>
        </div>
      </div>
    </section>
  );
}
