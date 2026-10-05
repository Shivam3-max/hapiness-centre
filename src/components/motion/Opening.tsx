"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scrollStore";
import { useFormation } from "../stage/useFormation";

export default function Opening() {
  const section = useFormation<HTMLElement>("orb");
  const inner = useRef<HTMLDivElement>(null);

  // the opening lifts and dissolves as you leave it
  useEffect(() =>
    subscribeScroll(({ y, vh }) => {
      const k = Math.min(1, y / (vh * 0.85));
      if (inner.current) {
        inner.current.style.opacity = String(1 - k);
        inner.current.style.transform = `translate3d(0, ${k * -4}rem, 0)`;
      }
    }), []);

  return (
    <section ref={section} className="relative flex min-h-[100svh] items-center justify-center px-5 pt-[76px]">
      <div ref={inner} className="relative w-full max-w-[52rem] text-center will-change-[opacity,transform]">
        <p className="eyebrow">Happiness Centre · Zirakpur</p>

        <h1 className="editor mt-8 text-[clamp(2.6rem,7.6vw,6.4rem)] leading-[1.02] text-forest">
          You don’t get a diet.
          <br />
          You get <em className="italic text-amber-deep">a day</em>.
        </h1>

        <p className="mx-auto mt-8 max-w-[40ch] text-[1rem] leading-relaxed text-muted">
          Meals, movement, a morning ritual and our own products — one complete day,
          built around your body.
        </p>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
          <Link href="/free-day"
                className="rounded-full bg-forest px-8 py-4 text-[0.92rem] font-semibold text-white transition-colors hover:bg-bark">
            Take your free day →
          </Link>
          <Link href="/transformations"
                className="rounded-full border border-hairline bg-white/60 px-8 py-4 text-[0.92rem] font-semibold text-forest backdrop-blur-sm transition-colors hover:bg-mist">
            See the wall
          </Link>
        </div>

        <p className="mt-6 text-[0.76rem] text-muted">
          Online or at the centre · no payment · no obligation
        </p>
      </div>

      <p className="absolute bottom-7 right-6 hidden text-[0.56rem] uppercase tracking-[0.18em] text-muted lg:block">
        fig. 01 — one day, at rest
      </p>
      <p className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[0.56rem] uppercase tracking-[0.22em] text-muted">
        Scroll
      </p>
    </section>
  );
}
