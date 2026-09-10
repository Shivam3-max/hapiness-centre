import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section, { Shell } from "@/components/Section";
import Reveal from "@/components/Reveal";
import FreeDayBand from "@/components/home/FreeDayBand";
import { PROGRAMS } from "@/data/content";
import { countByGoal } from "@/data/stories";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Six programmes at Happiness Centre, Zirakpur — weight loss, weight gain, diabetes care, thyroid and PCOS, and senior wellness.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title="One method. Six starting points."
        lead="Everybody gets the same four pillars. What changes between programmes is the plate, the pace, and how long we stay beside you."
      />
      <Section className="!pt-0">
        <Shell>
          <Reveal selector="[data-p]" stagger={0.06} className="grid gap-px bg-hairline">
            {PROGRAMS.map((p) => (
              <Link data-p key={p.slug} href={`/programs/${p.slug}`}
                    className="group grid gap-6 bg-canvas p-8 transition-colors hover:bg-bone lg:grid-cols-[0.9fr_1.1fr_auto] lg:items-center lg:gap-12 lg:p-10">
                <div>
                  <h2 className="display text-[clamp(1.9rem,3.4vw,2.6rem)] text-forest">{p.name}</h2>
                  <p className="tnum mt-2 text-[0.66rem] uppercase tracking-[0.18em] text-lime">
                    {p.days} days · {countByGoal(p.goal)} on the wall
                  </p>
                </div>
                <div>
                  <p className="text-[1.02rem] leading-snug text-ink">{p.tagline}</p>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">{p.who}</p>
                </div>
                <span aria-hidden className="text-[1.4rem] text-lime transition-transform group-hover:translate-x-1.5">→</span>
              </Link>
            ))}
          </Reveal>
        </Shell>
      </Section>
      <FreeDayBand />
    </>
  );
}
