import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { Shell, SectionHead } from "@/components/Section";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import FreeDayBand from "@/components/home/FreeDayBand";
import { STORIES, STORY_COUNT } from "@/data/stories";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The club",
  description: "Happiness Centre is a club as much as a clinic — a morning session at 8:30, an online class at 6:30, and a room full of people doing the same thing.",
};

const FACES = STORIES.slice(0, 12);

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="The club"
        title="The reason people don’t quit in week three."
        lead="Plans are easy to abandon in private. They are much harder to abandon in a room where somebody notices you weren’t there yesterday."
      />

      <Section className="!pt-0">
        <Shell>
          <div className="grid gap-px bg-hairline lg:grid-cols-3">
            {[
              [SITE.hours.opens, "Doors open", "Come early, weigh in, and get the awkward part over with before anyone else arrives."],
              [SITE.hours.morningSession, "The morning session", "Led by Mr. Sandeep Kumar and the coaching team. Everybody moves together, at their own level."],
              [SITE.hours.eveningClass, "The evening class", "Online, so a working day or a long commute never costs you the whole programme."],
            ].map(([t, h, b]) => (
              <div key={h} className="bg-canvas p-8 lg:p-10">
                <p className="tnum display text-[1.9rem] leading-none text-lime">{t}</p>
                <h2 className="display mt-5 text-[1.6rem] text-forest">{h}</h2>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{b}</p>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="bone">
        <Shell>
          <SectionHead
            eyebrow="The wall"
            title={`${STORY_COUNT} people you'll actually run into.`}
            lead="Everybody on our transformation wall still walks through the same door. Several of them will be at the morning session tomorrow."
          />
          <Reveal selector="[data-f]" stagger={0.04}
                  className="mt-12 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {FACES.map((s) => (
              <span data-f key={s.id} className="relative block aspect-square overflow-hidden border border-hairline bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.views[0].after.src} alt="" loading="lazy"
                     className="absolute inset-0 h-full w-full object-cover object-top" />
              </span>
            ))}
          </Reveal>
          <div className="mt-10">
            <Button href="/transformations" variant="ghost">See the whole wall</Button>
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <SectionHead eyebrow="What else happens here" title="Beyond the morning session." />
          <div className="mt-12 grid gap-px bg-hairline md:grid-cols-2">
            {[
              ["The group chat", "TODO — confirm how the member group works and who is in it."],
              ["Challenges", "TODO — confirm what challenges the centre runs and how often."],
              ["Festival sessions", "TODO — confirm what happens around Diwali, Lohri and wedding season."],
              ["Family days", "TODO — confirm whether family members can join sessions."],
            ].map(([t, b]) => (
              <div key={t} className="bg-canvas p-8 lg:p-10">
                <h3 className="display text-[1.5rem] text-forest">{t}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{b}</p>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <FreeDayBand />
    </>
  );
}
