import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { Shell } from "@/components/Section";
import StepForm, { type Step } from "@/components/StepForm";
import Button from "@/components/Button";
import { GOALS } from "@/data/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a consultation",
  description: "Sit down with a dietitian at Happiness Centre, Zirakpur, and talk through your goal, your reports and your kitchen.",
};

const STEPS: Step[] = [
  { key: "goal", kind: "choice", label: "What would you like to work on?", options: GOALS.map((g) => g.label) },
  { key: "who", kind: "choice", label: "Who is this for?", options: ["Myself", "A parent", "My partner", "My child"] },
  { key: "name", kind: "text", label: "Your name?", placeholder: "First name is enough" },
  { key: "phone", kind: "tel", label: "Best number to reach you?", placeholder: "10-digit mobile" },
  { key: "notes", kind: "textarea", label: "Anything we should know?", hint: "Conditions, medication, past attempts, food you can’t give up. All useful.", placeholder: "Optional but helpful" },
];

export default function ConsultationPage() {
  const a = SITE.address;
  return (
    <>
      <PageHero
        eyebrow="Consultation"
        title="Talk to a dietitian first."
        lead="If you would rather ask questions before committing to a day, book a sit-down. Bring your latest reports if you have them."
      />

      <Section className="!pt-0">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="eyebrow">Where you’ll come</p>
              <address className="mt-6 not-italic text-[1.05rem] leading-relaxed text-ink">
                {a.line1}<br />{a.line2}<br />{a.locality}<br />{a.region} {a.postal}
              </address>

              <div className="mt-9 grid gap-px bg-hairline">
                {[["Bring", "Any recent blood work, and a list of your medication."],
                  ["Takes", "About forty minutes."],
                  ["Costs", "Nothing, if you follow it with your free day."]].map(([k, v]) => (
                  <div key={k} className="bg-canvas py-4 pr-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.16em] text-muted">{k}</p>
                    <p className="mt-1.5 text-[0.92rem] leading-snug text-ink">{v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-9">
                <Button href="/free-day" variant="ghost">Or skip straight to the free day</Button>
              </div>
            </div>

            <StepForm
              steps={STEPS}
              submitLabel="Request a slot"
              doneTitle="We’ve got it."
              doneBody="One of the founders will call you to fix a time. If you listed medication or conditions, they’ll have read that before ringing."
            />
          </div>
        </Shell>
      </Section>
    </>
  );
}
