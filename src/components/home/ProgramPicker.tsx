import Link from "next/link";
import Section, { Shell, SectionHead } from "../Section";
import Reveal from "../Reveal";
import Button from "../Button";
import { PROGRAMS } from "@/data/content";
import { countByGoal } from "@/data/stories";

export default function ProgramPicker() {
  return (
    <Section id="programs" field="dots">
      <Shell>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <SectionHead eyebrow="Programmes" title="Six ways in. One method." />
          <Button href="/programs" variant="ghost">All six, in detail</Button>
        </div>

        <Reveal selector="[data-p]" stagger={0.05} className="mt-16 border-t border-hairline">
          {PROGRAMS.map((p, i) => (
            <Link
              data-p
              key={p.slug}
              href={`/programs/${p.slug}`}
              className="group grid items-baseline gap-x-10 gap-y-3 border-b border-hairline py-7 transition-colors hover:bg-cream lg:grid-cols-[auto_1fr_1.1fr_auto] lg:py-9"
            >
              <span className="tnum display text-[1.5rem] leading-none text-amber-deep/45 lg:w-16">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display text-[clamp(1.8rem,4vw,3.1rem)] lowercase text-forest">
                {p.name}
              </h3>
              <p className="max-w-[48ch] text-[0.95rem] leading-snug text-muted">{p.tagline}</p>
              <span className="flex items-center gap-6 lg:justify-end">
                <span className="tnum whitespace-nowrap text-[0.66rem] uppercase tracking-[0.15em] text-muted">
                  {p.days} days · {countByGoal(p.goal)} stories
                </span>
                <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline text-amber-deep transition-all group-hover:border-amber group-hover:bg-amber group-hover:text-forest">
                  →
                </span>
              </span>
            </Link>
          ))}
        </Reveal>
      </Shell>
    </Section>
  );
}
