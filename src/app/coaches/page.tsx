import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { Shell, SectionHead } from "@/components/Section";
import Reveal from "@/components/Reveal";
import FreeDayBand from "@/components/home/FreeDayBand";
import { COACHES } from "@/data/content";
import { STORY_COUNT, TOTAL_KG_LOST } from "@/data/stories";

export const metadata: Metadata = {
  title: "Coaches",
  description: "Meet the two founders who run Happiness Centre in Zirakpur and write every plan themselves.",
};

export default function CoachesPage() {
  return (
    <>
      <PageHero
        eyebrow="Coaches"
        title="Small on purpose."
        lead="The people who write your plan are the people who greet you at the door and read your body composition. Nothing is handed to a call centre."
      />

      <Section className="!pt-0">
        <Shell>
          <Reveal selector="[data-c]" stagger={0.1} className="grid gap-px bg-hairline lg:grid-cols-2">
            {COACHES.map((c) => (
              <article data-c key={c.name} className="bg-canvas p-9 lg:p-14">
                <span aria-hidden className="grid h-20 w-20 place-items-center rounded-full border border-hairline bg-bone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/logo-mark.svg" alt="" className="h-10 w-auto opacity-70" />
                </span>
                <h2 className="display mt-8 text-[clamp(1.8rem,3.4vw,2.5rem)] text-forest">{c.name}</h2>
                <p className="mt-2 text-[0.7rem] uppercase tracking-[0.18em] text-lime">{c.role}</p>
                <p className="mt-6 text-[0.98rem] leading-relaxed text-muted">{c.bio}</p>
              </article>
            ))}
          </Reveal>
        </Shell>
      </Section>

      <Section tone="forest">
        <Shell>
          <SectionHead eyebrow="Between them" title={<span className="text-white">The work, in numbers.</span>} />
          <dl className="mt-12 grid gap-px bg-white/15 sm:grid-cols-3">
            {[[String(STORY_COUNT), "stories photographed"], [`${TOTAL_KG_LOST} kg`, "shed by members"], ["1 day", "free, before you pay"]].map(([n, l]) => (
              <div key={l} className="bg-forest px-6 py-10">
                <dt className="display tnum text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-lime">{n}</dt>
                <dd className="mt-3 text-[0.72rem] uppercase tracking-[0.16em] text-white/55">{l}</dd>
              </div>
            ))}
          </dl>
        </Shell>
      </Section>

      <FreeDayBand />
    </>
  );
}
