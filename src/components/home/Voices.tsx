import Section, { Shell, SectionHead } from "../Section";
import Reveal from "../Reveal";
import { REVIEWS } from "@/data/content";

export default function Voices() {
  const [lead, ...rest] = REVIEWS;
  return (
    <Section id="voices" tone="cream" glow="amber">
      <Shell>
        <SectionHead eyebrow="Voices" title="What members say when nobody’s selling." />

        <Reveal className="mt-16">
          <figure className="border-y border-hairline py-12 lg:py-16">
            <blockquote className="display max-w-[20ch] text-[clamp(2rem,5.4vw,4.4rem)] lowercase leading-[0.95] text-forest">
              <span aria-hidden className="text-amber">“</span>
              {lead.quote}
            </blockquote>
            <figcaption className="mt-9 text-[0.72rem] uppercase tracking-[0.16em] text-muted">
              {lead.who} · {lead.program}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal selector="[data-q]" stagger={0.06}
                className="grid gap-px bg-hairline md:grid-cols-2 xl:grid-cols-5">
          {rest.map((r) => (
            <figure data-q key={r.quote} className="flex flex-col bg-cream p-7">
              <blockquote className="flex-1 text-[1rem] leading-snug text-ink">{r.quote}</blockquote>
              <figcaption className="mt-7 border-t border-hairline pt-4 text-[0.64rem] uppercase tracking-[0.14em] text-muted">
                {r.who}
                <span className="mt-1 block text-amber-deep">{r.program}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </Shell>
    </Section>
  );
}
