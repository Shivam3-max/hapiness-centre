import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { Shell } from "@/components/Section";
import StoryGrid from "@/components/StoryGrid";
import BeforeAfter from "@/components/BeforeAfter";
import FreeDayBand from "@/components/home/FreeDayBand";
import { STORIES, STORY_COUNT, TOTAL_KG_LOST, kgLabel } from "@/data/stories";

export const metadata: Metadata = {
  title: "Transformations",
  description: `${STORY_COUNT} members of Happiness Centre, photographed months apart on the same wall in Zirakpur.`,
};

const FEATURED = STORIES[3];

export default function TransformationsPage() {
  return (
    <>
      <PageHero
        eyebrow={`${STORY_COUNT} stories`}
        title={<>The wall we photograph everybody against.</>}
        lead={
          <>
            Same wall, same light, months apart. Nobody here is a model and nothing is
            retouched — these are members of the centre in Zirakpur. Between them,{" "}
            <strong className="tnum font-semibold text-forest">{TOTAL_KG_LOST} kg</strong>.
          </>
        }
      />

      <Section className="!pt-0">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-center lg:gap-16">
            <BeforeAfter
              before={FEATURED.views[0].full.before}
              after={FEATURED.views[0].full.after}
              className="mx-auto aspect-[1/2] w-full max-w-[380px]"
            />
            <div>
              <p className="eyebrow">Drag the handle</p>
              <p className="display mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] text-forest">
                {kgLabel(FEATURED.kg)} in {FEATURED.months} months, on the{" "}
                {FEATURED.goalLabel.toLowerCase()} programme.
              </p>
              <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">
                Every story below opens the same way. Pull the divider across and the
                months collapse into one image. Individual results — not a promise of
                what will happen to you.
              </p>
            </div>
          </div>
        </Shell>
      </Section>

      <Section tone="bone" className="!pt-0 pb-[clamp(4.5rem,9vw,8rem)]">
        <Shell className="pt-[clamp(3rem,6vw,5rem)]">
          <StoryGrid />
        </Shell>
      </Section>

      <FreeDayBand />
    </>
  );
}
