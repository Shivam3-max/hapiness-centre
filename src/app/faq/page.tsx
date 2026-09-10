import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { Shell } from "@/components/Section";
import FreeDayBand from "@/components/home/FreeDayBand";
import { FAQS } from "@/data/content";

export const metadata: Metadata = {
  title: "Questions",
  description: "Straight answers about programmes, products, medication, the free day and who Happiness Centre in Zirakpur is for.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Questions" title="Asked often, answered plainly."
                lead="If something here is still unclear, ring us or come in. We would rather answer it before you pay for anything." />
      <Section className="!pt-0">
        <Shell>
          <div className="mx-auto max-w-[74ch] border-t border-hairline">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-hairline">
                <summary className="flex cursor-pointer list-none items-start gap-6 py-7 [&::-webkit-details-marker]:hidden">
                  <span className="display flex-1 text-[clamp(1.15rem,2.4vw,1.55rem)] leading-snug text-forest">{f.q}</span>
                  <span aria-hidden className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-hairline text-lime transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[62ch] pb-8 text-[0.98rem] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Shell>
      </Section>
      <FreeDayBand />
    </>
  );
}
