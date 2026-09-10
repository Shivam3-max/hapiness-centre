import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { Shell, SectionHead } from "@/components/Section";
import StepForm, { type Step } from "@/components/StepForm";
import Reveal from "@/components/Reveal";
import { GOALS } from "@/data/content";
import { STORY_COUNT } from "@/data/stories";

export const metadata: Metadata = {
  title: "Your free day",
  description: "One full day of the Happiness Centre programme, free — a prepared meal, the morning ritual, the movement set and a body composition reading.",
};

const STEPS: Step[] = [
  { key: "goal", kind: "choice", label: "What brought you here?", hint: "Pick the closest one. We’ll go into detail on the day.", options: GOALS.map((g) => g.label) },
  { key: "name", kind: "text", label: "And your name?", placeholder: "First name is enough" },
  { key: "phone", kind: "tel", label: "A number we can WhatsApp?", hint: "Your coach uses it for the day’s check-in. Nothing else.", placeholder: "10-digit mobile" },
  { key: "day", kind: "date", label: "Which day suits you?", hint: "Mornings work best — the ritual starts the day." },
];

const INCLUDED = [
  ["01", "A body composition reading", "Weight, fat, muscle, water. The number you actually need, not the one on your bathroom scale."],
  ["02", "The morning ritual", "Done with a coach, so you know what it feels like rather than reading it on a sheet."],
  ["03", "The movement set", "Twenty minutes. Chair variants available. Nobody watches you."],
  ["04", "One prepared meal", "An actual meal from the plan your goal would put you on. You eat it here."],
  ["05", "A coach on WhatsApp", "For the whole day, including the evening, which is when most questions arrive."],
];

export default function FreeDayPage() {
  return (
    <>
      <PageHero
        eyebrow="No card, no commitment"
        title="Live one day of it, on us."
        lead="Most places offer a free consultation — a conversation, and then a price. We would rather you ate the food, did the set and saw your numbers before anyone mentions money."
      />

      <Section className="!pt-0">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <p className="eyebrow">What the day contains</p>
              <Reveal selector="[data-i]" stagger={0.06} className="mt-7 grid gap-px bg-hairline">
                {INCLUDED.map(([n, t, b]) => (
                  <div data-i key={n} className="flex gap-6 bg-canvas py-6 pr-4">
                    <span className="tnum display shrink-0 text-[1.5rem] leading-none text-lime">{n}</span>
                    <div>
                      <h3 className="text-[1rem] font-semibold leading-snug text-ink">{t}</h3>
                      <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{b}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
              <p className="mt-8 text-[0.84rem] leading-relaxed text-muted">
                {STORY_COUNT} of the people on our wall started with exactly this day.
              </p>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <StepForm
                steps={STEPS}
                submitLabel="Book my free day"
                doneTitle="That’s booked."
                doneBody="We’ll WhatsApp you to confirm the time and tell you what to bring — which is nothing except an empty stomach."
              />
              <p className="mt-5 text-center text-[0.76rem] leading-relaxed text-muted">
                We use your number to arrange the day and nothing else. No card is taken at any point.
              </p>
            </div>
          </div>
        </Shell>
      </Section>

      <Section tone="bone">
        <Shell>
          <SectionHead eyebrow="Afterwards" title="Then you decide, and we mean that." align="center" />
          <p className="mx-auto mt-7 max-w-[58ch] text-center text-[1rem] leading-relaxed text-muted">
            At the end of the day you get your readings and a written summary of what a
            programme would look like for you. If you would rather take it away and think,
            take it away and think. Nobody will ring you twice.
          </p>
        </Shell>
      </Section>
    </>
  );
}
