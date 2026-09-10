"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TILES, STORY_COUNT } from "@/data/stories";
import type { Story, View } from "@/data/stories";

type Tile = { story: Story; view: View };

const LANES = [TILES.slice(0, 11), TILES.slice(11, 22), TILES.slice(22)];

/** One transformation as a mini diptych — reads as change even at thumbnail size. */
function Tile({ item, eager }: { item: Tile; eager: boolean }) {
  return (
    <figure className="relative h-full aspect-square shrink-0 overflow-hidden border border-hairline bg-white">
      <div className="grid h-full grid-cols-2">
        {[item.view.before, item.view.after].map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={s.src}
            alt=""
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover object-top"
            style={{ backgroundImage: `url(${s.lqip})`, backgroundSize: "cover" }}
          />
        ))}
      </div>
      <span aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-lime/70" />
    </figure>
  );
}

function Lane({ items, dur, reverse, eager }: { items: Tile[]; dur: number; reverse?: boolean; eager?: boolean }) {
  return (
    <div className="flex h-[clamp(132px,19vh,210px)] overflow-hidden">
      <div className={`drift flex shrink-0 gap-3 pr-3 ${reverse ? "drift-rev" : ""}`} style={{ ["--dur" as string]: `${dur}s` }}>
        {[...items, ...items].map((it, i) => (
          <Tile key={`${it.story.id}-${it.view.view}-${i}`} item={it} eager={Boolean(eager) && i < 5} />
        ))}
      </div>
    </div>
  );
}

export default function ProofWall() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    // If rAF never ticks (hidden tab/pane) a .from() would strand the copy
    // invisible, so bail out before setting any start state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (document.documentElement.hasAttribute("data-still")) return;
    const ctx = gsap.context(() => {
      gsap.set(".hero-line span", { yPercent: 115 });
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(".hero-line span", { yPercent: 0, duration: 1.15, stagger: 0.09 }, 0.15)
        .from(".hero-fade", { opacity: 0, y: 16, duration: 0.9, stagger: 0.1 }, 0.6)
        .from(".hero-wall", { opacity: 0, duration: 1.4 }, 0);
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="wall relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[76px]">
      {/* the proof, drifting */}
      <div aria-hidden className="hero-wall pointer-events-none absolute inset-0 wall-mask flex flex-col justify-center gap-3 opacity-90">
        <Lane items={LANES[0]} dur={92} eager />
        <Lane items={LANES[1]} dur={116} reverse />
        <Lane items={LANES[2]} dur={78} />
      </div>

      {/* scrim so the type stays legible over it */}
      <div aria-hidden className="absolute inset-0 bg-canvas/60 sm:bg-canvas/28" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 46% at 50% 44%, rgba(255,255,255,.96) 0%, rgba(255,255,255,.9) 45%, rgba(255,255,255,.55) 72%, rgba(255,255,255,0) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 text-center sm:px-8">
        <p className="eyebrow hero-fade text-[0.62rem] tracking-[0.16em] sm:text-[0.6875rem] sm:tracking-[0.22em]">
          Zirakpur · Wellness club &amp; community
        </p>

        <h1 className="display mt-6 text-balance text-[clamp(2.05rem,8.7vw,8.2rem)] text-forest sm:mt-7">
          {["You don’t get a diet.", "You get a day."].map((line, i) => (
            <span key={i} className="hero-line block overflow-hidden pb-[0.06em]">
              <span className="block">
                {i === 1 ? (
                  <>
                    You get{" "}
                    <em className="not-italic text-lime" style={{ fontVariationSettings: '"WONK" 1, "SOFT" 60' }}>
                      a day
                    </em>
                    .
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-fade mx-auto mt-7 max-w-[42ch] text-[0.92rem] leading-relaxed text-muted sm:mt-8 sm:max-w-[46ch] sm:text-[1.02rem]">
          Meals, movement, a morning ritual and our own products — one complete
          day, built around your body. Come and live the first one on us.
        </p>

        <div className="hero-fade mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/free-day"
            className="rounded-full bg-forest px-7 py-3.5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-bark"
          >
            Start your free day
          </Link>
          <Link
            href="/transformations"
            className="rounded-full border border-hairline bg-white/70 px-7 py-3.5 text-[0.9rem] font-semibold text-forest backdrop-blur-sm transition-colors hover:bg-mist"
          >
            See all {STORY_COUNT} stories
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-16 w-full max-w-[1480px] px-5 sm:px-8">
        <dl className="grid grid-cols-3 border-t border-hairline bg-canvas">
          {[
            [String(STORY_COUNT), "people, photographed"],
            ["1", "day, free to try"],
            ["4", "pillars in every package"],
          ].map(([n, label]) => (
            <div key={label} className="min-w-0 border-l border-hairline px-3 py-4 first:border-l-0 sm:px-7 sm:py-5">
              <dt className="display tnum text-[1.75rem] text-forest sm:text-[2.9rem]">{n}</dt>
              <dd className="mt-1 text-[0.58rem] uppercase leading-snug tracking-[0.1em] text-muted sm:text-[0.72rem] sm:tracking-[0.14em]">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
