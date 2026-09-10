import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms", description: "The terms on which Happiness Centre provides its programmes." };

export default function Terms() {
  return (
    <LegalPage
      title="Terms"
      updated="10 September 2026"
      sections={[
        { h: "What we provide", p: ["Nutrition, lifestyle and wellness guidance, delivered as programmes that combine a meal plan, movement, a morning routine and a product kit."] },
        { h: "What we are not", p: ["We are not a medical practice and we do not provide medical treatment. Nothing on this site or in a programme is a diagnosis, a prescription, or a substitute for care from your doctor.", "We never advise you to start, stop or change prescription medication. Those decisions belong to your treating physician."] },
        { h: "Results", p: ["Every outcome shown on this site belongs to an individual member and reflects their body, their circumstances and their adherence. Results vary, and nothing here is a guarantee of what you will achieve."] },
        { h: "The free day", p: ["The introductory day is offered free and carries no obligation to purchase. We may limit it to one per person."] },
        { h: "Products", p: ["Items in the kit are nutritional supplements, not medicines. They are not intended to diagnose, treat, cure or prevent any disease."] },
        { h: "Your responsibility", p: ["Tell us about your conditions, medication and allergies before starting, and keep us updated if they change. Stop and seek medical advice if you feel unwell during a programme."] },
      ]}
    />
  );
}
