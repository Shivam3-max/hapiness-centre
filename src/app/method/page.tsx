import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { Shell, SectionHead } from "@/components/Section";
import Reveal from "@/components/Reveal";
import ADay from "@/components/home/ADay";
import FreeDayBand from "@/components/home/FreeDayBand";
import { PILLARS } from "@/data/content";

export const metadata: Metadata = {
  title: "The Method",
  description: "Diet, movement, a morning ritual and our own products — the four pillars behind every programme at Happiness Centre, Zirakpur.",
};

export default function MethodPage() {
  return (
    <>
      <PageHero
        eyebrow="The method"
        title="Nothing here is clever. All of it is repeated."
        lead="People assume there is a trick. There isn’t. There are four things, arranged into a day you can actually live, done again tomorrow."
      />

      <Section className="!pt-0">
        <Shell>
          <Reveal selector="[data-pil]" stagger={0.08} className="grid gap-px bg-hairline">
            {PILLARS.map((p, i) => (
              <article data-pil key={p.n}
                       className={`grid gap-8 bg-canvas p-8 lg:grid-cols-[auto_1fr_1fr] lg:gap-14 lg:p-12 ${i % 2 ? "lg:bg-bone" : ""}`}>
                <p className="tnum display text-[3.2rem] leading-none text-lime lg:text-[4.5rem]">{p.n}</p>
                <div>
                  <h2 className="display text-[clamp(2rem,4vw,3rem)] text-forest">{p.name}</h2>
                  <p className="mt-4 text-[1.08rem] leading-snug text-ink">{p.line}</p>
                  <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
                </div>
                <ul className="space-y-3 self-center border-t border-hairline pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  {p.detail.map((d) => (
                    <li key={d} className="flex gap-3 text-[0.9rem] leading-snug text-muted">
                      <span aria-hidden className="mt-[0.5rem] h-px w-4 shrink-0 bg-lime" />
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </Shell>
      </Section>

      <ADay />

      <Section>
        <Shell>
          <SectionHead
            eyebrow="What we don’t do"
            title="A short list, kept deliberately."
            lead="It is easier to trust a place when it tells you where it stops."
          />
          <div className="mt-12 grid gap-px bg-hairline md:grid-cols-3">
            {[
              ["No starvation weeks", "If a plan leaves you unable to work or think, it is a bad plan, and you will quit it in nine days."],
              ["No medication advice", "We are not doctors. We plan around your prescription and we never suggest changing it."],
              ["No endless upsell", "The product kit is inside the fee. There is no second kit waiting at the end of the programme."],
            ].map(([t, b]) => (
              <div key={t} className="bg-canvas p-8">
                <h3 className="display text-[1.5rem] text-forest">{t}</h3>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">{b}</p>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <FreeDayBand />
    </>
  );
}
