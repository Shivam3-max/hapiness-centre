import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { Shell, SectionHead } from "@/components/Section";
import Calculators from "@/components/Calculators";
import FreeDayBand from "@/components/home/FreeDayBand";

export const metadata: Metadata = {
  title: "Tools",
  description: "Free BMI, healthy weight range and daily calorie calculators using Asian-Indian cut-offs, from Happiness Centre, Zirakpur.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tools"
        title="Start with a number you trust."
        lead="Nothing to sign up for and nothing stored. Work out roughly where you are, then come in and get it measured properly."
      />
      <Section className="!pt-0">
        <Shell><Calculators /></Shell>
      </Section>
      <Section tone="bone">
        <Shell>
          <SectionHead
            eyebrow="Why the readings differ"
            title="A scale weighs everything. We weigh what matters."
            lead="Two people at the same weight can sit in completely different places. Body composition splits that weight into fat, muscle and water — which is why the reading on your free day tells you more than four weeks of bathroom scales."
          />
        </Shell>
      </Section>
      <FreeDayBand />
    </>
  );
}
