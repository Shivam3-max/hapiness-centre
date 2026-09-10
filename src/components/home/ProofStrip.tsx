import Link from "next/link";
import Section, { Shell, SectionHead } from "../Section";
import Reveal from "../Reveal";
import Button from "../Button";
import { STORIES, TOTAL_KG_LOST, STORY_COUNT, kgLabel } from "@/data/stories";

const PICK = STORIES.slice(0, 8);

export default function ProofStrip() {
  return (
    <Section id="proof" tone="cream" glow="leaf">
      <Shell>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="Transformations"
            title={`${STORY_COUNT} people who stopped starting over.`}
            lead={`Photographed in the centre, on the same wall, months apart. Between them they are ${TOTAL_KG_LOST} kg lighter.`}
          />
          <Button href="/transformations" variant="ghost">See every story</Button>
        </div>

        <Reveal selector="[data-t]" stagger={0.05}
                className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PICK.map((s) => {
            const v = s.views[0];
            return (
              <Link data-t key={s.id} href="/transformations"
                    className="group block overflow-hidden border border-hairline bg-white transition-shadow hover:shadow-[0_14px_40px_rgba(31,77,17,.13)]">
                <span className="relative block aspect-[3/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.before.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.after.src} alt="" loading="lazy"
                       className="absolute inset-0 h-full w-full object-cover object-top transition-[clip-path] duration-700 ease-out [clip-path:inset(0_0_0_0)] group-hover:[clip-path:inset(0_0_0_100%)]" />
                </span>
                <span className="flex items-baseline justify-between gap-2 border-t border-hairline px-3.5 py-3">
                  <span className="display tnum text-[1.45rem] text-forest">{kgLabel(s.kg)}</span>
                  <span className="text-[0.6rem] uppercase tracking-[0.13em] text-muted">{s.months} mo</span>
                </span>
              </Link>
            );
          })}
        </Reveal>
      </Shell>
    </Section>
  );
}
