import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section, { Shell } from "@/components/Section";
import Reveal from "@/components/Reveal";
import FreeDayBand from "@/components/home/FreeDayBand";
import { PRODUCTS } from "@/data/content";

export const metadata: Metadata = {
  title: "The kit",
  description: "The product kit included in every Happiness Centre programme — no separate purchase, no upsell at the end.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="The kit"
        title="Included, not upsold."
        lead="Six items that fill the gaps a home kitchen genuinely struggles with. They come inside the programme fee, and on longer programmes they are replenished every month."
      />
      <Section className="!pt-0">
        <Shell>
          <Reveal selector="[data-pr]" stagger={0.05} className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Link data-pr key={p.slug} href={`/products/${p.slug}`}
                    className="group flex flex-col bg-canvas p-8 transition-colors hover:bg-bone lg:p-9">
                <span aria-hidden className="grid aspect-square w-full place-items-center border border-hairline bg-mist">
                  <span className="display tnum text-[3.5rem] text-lime/50">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <p className="mt-6 text-[0.62rem] uppercase tracking-[0.16em] text-muted">{p.kind}</p>
                <h2 className="display mt-2 text-[1.6rem] text-forest">{p.name}</h2>
                <p className="mt-3 text-[0.92rem] leading-snug text-ink">{p.line}</p>
                <span className="mt-6 flex items-center gap-2 text-[0.78rem] font-semibold text-forest">
                  What it’s for <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </Reveal>
          <p className="mt-10 max-w-[62ch] text-[0.84rem] leading-relaxed text-muted">
            These are nutritional supplements, not medicines. They support a plan; they
            do not treat, cure or prevent disease. If you take prescription medication,
            check with your doctor before starting any supplement.
          </p>
        </Shell>
      </Section>
      <FreeDayBand />
    </>
  );
}
