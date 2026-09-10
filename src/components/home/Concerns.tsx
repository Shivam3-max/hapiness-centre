import Link from "next/link";
import Section, { Shell, SectionHead } from "../Section";
import Reveal from "../Reveal";
import { GOALS, PROGRAMS } from "@/data/content";
import { STORIES, countByGoal, kgLabel } from "@/data/stories";

const BLURB: Record<string, string> = {
  "weight-loss": "Ten kilos or fifty, the method is the same. What changes is how long we stay beside you.",
  "weight-gain": "Harder than losing, and almost nobody takes it seriously. We start by fixing absorption.",
  "diabetes": "Steadier numbers alongside your doctor. We plan around your dosing times, never against them.",
  "thyroid-pcos": "For bodies where the usual advice stopped working, and the usual advice was ‘eat less’.",
  "senior-wellness": "Knees, blood pressure, energy, independence. The scale is the least interesting number.",
};

export default function Concerns() {
  return (
    <Section id="concerns" glow="mist">
      <Shell>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <SectionHead
            eyebrow="What we work with"
            title="Come in with a problem, not a goal weight."
          />
          <p className="max-w-[38ch] text-[1.02rem] leading-relaxed text-muted">
            Everybody arrives carrying something specific — a report, a diagnosis, a
            wedding, a knee. We start there rather than at a number.
          </p>
        </div>

        <Reveal selector="[data-g]" stagger={0.05} className="mt-16 border-t border-hairline">
          {GOALS.map((g) => {
            const p = PROGRAMS.find((x) => x.goal === g.key);
            const n = countByGoal(g.key);
            const best = STORIES.filter((s) => s.goal === g.key)
              .sort((a, b) => Math.abs(b.kg) - Math.abs(a.kg))[0];
            return (
              <Link
                data-g
                key={g.key}
                href={p ? `/programs/${p.slug}` : "/programs"}
                className="group relative grid items-center gap-x-10 gap-y-4 border-b border-hairline py-8 transition-colors hover:bg-bone md:grid-cols-[1.1fr_1.2fr_auto_auto] lg:py-10"
              >
                <h3 className="display text-[clamp(1.9rem,4.4vw,3.4rem)] lowercase text-forest transition-colors group-hover:text-bark">
                  {g.label}
                </h3>
                <p className="max-w-[46ch] text-[0.92rem] leading-relaxed text-muted">
                  {BLURB[g.key]}
                </p>
                <p className="tnum text-[0.68rem] uppercase tracking-[0.16em] text-muted md:text-right">
                  <span className="display block text-[1.9rem] leading-none text-amber-deep">{n}</span>
                  stories
                </p>
                <span className="flex items-center gap-5 md:justify-end">
                  {best && (
                    <span className="hidden shrink-0 overflow-hidden border border-hairline bg-white lg:block">
                      <span className="grid aspect-square w-[86px] grid-cols-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={best.views[0].before.src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={best.views[0].after.src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
                      </span>
                      <span className="tnum block border-t border-hairline py-1 text-center text-[0.62rem] font-bold text-forest">
                        {kgLabel(best.kg)}
                      </span>
                    </span>
                  )}
                  <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline text-amber-deep transition-all group-hover:border-amber group-hover:bg-amber group-hover:text-forest">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </Reveal>
      </Shell>
    </Section>
  );
}
