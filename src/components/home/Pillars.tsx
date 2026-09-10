import Section, { Shell, SectionHead } from "../Section";
import Reveal from "../Reveal";
import { PILLARS } from "@/data/content";

export default function Pillars() {
  return (
    <Section tone="cream" id="method" field="dots" glow="amber">
      <Shell>
        <SectionHead
          eyebrow="The method"
          title="Four things, done every day, for as long as it takes."
          lead="A plan on its own is paper. What changes a body is the same four things repeating until they stop feeling like effort."
        />
        <Reveal selector="[data-pillar]" stagger={0.08}
                className="mt-16 grid gap-px bg-hairline md:grid-cols-2 xl:grid-cols-4">
          {PILLARS.map((p, i) => (
            <article data-pillar key={p.n}
                     className={`group relative flex flex-col p-9 transition-colors xl:p-10 ${
                       i === 1 ? "bg-forest text-white/80" : "bg-cream hover:bg-canvas"}`}>
              <p className={`display text-[3.6rem] leading-none ${i === 1 ? "text-amber" : "text-amber-deep/35"}`}>
                {p.n}
              </p>
              <h3 className={`display mt-7 text-[2.3rem] lowercase ${i === 1 ? "text-white" : "text-forest"}`}>
                {p.name}
              </h3>
              <p className={`mt-4 text-[1.02rem] font-medium leading-snug ${i === 1 ? "text-white" : "text-ink"}`}>
                {p.line}
              </p>
              <p className={`mt-4 text-[0.9rem] leading-relaxed ${i === 1 ? "text-white/65" : "text-muted"}`}>
                {p.body}
              </p>
              <ul className={`mt-auto space-y-2.5 border-t pt-6 ${i === 1 ? "border-white/20" : "border-hairline"}`}
                  style={{ marginTop: "2.25rem" }}>
                {p.detail.map((d) => (
                  <li key={d} className={`flex gap-3 text-[0.82rem] leading-snug ${i === 1 ? "text-white/65" : "text-muted"}`}>
                    <span aria-hidden className="mt-[0.45rem] h-px w-3.5 shrink-0 bg-amber" />
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </Shell>
    </Section>
  );
}
