import Section, { Shell, SectionHead } from "../Section";
import Reveal from "../Reveal";
import Button from "../Button";
import { COACHES } from "@/data/content";

export default function Founders() {
  return (
    <Section id="founders" glow="mist">
      <Shell>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHead
            eyebrow="Who you’ll actually meet"
            title="Two people, and a room full of members."
            lead="Happiness Centre is small on purpose. The people who write your plan are the people who greet you at the door."
          />
          <Reveal selector="[data-c]" className="grid gap-px self-center bg-hairline sm:grid-cols-2">
            {COACHES.map((c) => (
              <article data-c key={c.name} className="bg-canvas p-8 lg:p-10">
                <span aria-hidden className="grid h-14 w-14 place-items-center rounded-full border border-hairline bg-canvas">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/logo-mark.svg" alt="" className="h-7 w-auto opacity-70" />
                </span>
                <h3 className="display mt-7 text-[2rem] lowercase text-forest">{c.name}</h3>
                <p className="mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-amber-deep">{c.role}</p>
                <p className="mt-5 text-[0.9rem] leading-relaxed text-muted">{c.bio}</p>
              </article>
            ))}
          </Reveal>
        </div>
        <div className="mt-12">
          <Button href="/community" variant="ghost">Inside the club</Button>
        </div>
      </Shell>
    </Section>
  );
}
