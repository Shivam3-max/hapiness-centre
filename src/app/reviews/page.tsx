import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { Shell } from "@/components/Section";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import FreeDayBand from "@/components/home/FreeDayBand";
import { REVIEWS } from "@/data/content";
import { STORY_COUNT, TOTAL_KG_LOST } from "@/data/stories";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What members of Happiness Centre, Zirakpur say about the programmes, the coaches and the morning session.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="In their words, not ours."
        lead="We ask every member for an honest line at the end of their programme, including the ones who did not enjoy it."
        aside={
          <dl className="mt-10 grid grid-cols-2 gap-px bg-hairline">
            {[[String(STORY_COUNT), "documented stories"], [`${TOTAL_KG_LOST} kg`, "shed between them"]].map(([n, l]) => (
              <div key={l} className="bg-canvas px-5 py-5">
                <dt className="display tnum text-[2rem] leading-none text-forest">{n}</dt>
                <dd className="mt-2 text-[0.66rem] uppercase tracking-[0.14em] text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        }
      />
      <Section className="!pt-0">
        <Shell>
          <Reveal selector="[data-r]" stagger={0.06} className="grid gap-px bg-hairline md:grid-cols-2 xl:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure data-r key={r.quote} className="flex flex-col bg-canvas p-8 lg:p-10">
                <span aria-hidden className="display text-[2.8rem] leading-none text-lime">“</span>
                <blockquote className="display mt-3 flex-1 text-[1.35rem] leading-[1.25] text-forest">{r.quote}</blockquote>
                <figcaption className="mt-8 border-t border-hairline pt-4 text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                  {r.who} · {r.program}
                </figcaption>
              </figure>
            ))}
          </Reveal>
          <div className="mt-12 border border-hairline bg-bone p-8 lg:p-10">
            <p className="eyebrow">A note on results</p>
            <p className="mt-4 max-w-[70ch] text-[0.92rem] leading-relaxed text-muted">
              Every outcome on this site belongs to one person. Bodies, conditions,
              medication and circumstances differ, and none of this is a promise of what
              will happen to you. It is a record of what happened to them.
            </p>
            <div className="mt-8"><Button href="/transformations" variant="ghost">See the photographs</Button></div>
          </div>
        </Shell>
      </Section>
      <FreeDayBand />
    </>
  );
}
