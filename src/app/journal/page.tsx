import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section, { Shell } from "@/components/Section";
import Reveal from "@/components/Reveal";
import FreeDayBand from "@/components/home/FreeDayBand";
import { POSTS } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on nutrition, movement and behaviour from the coaches at Happiness Centre, Zirakpur.",
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function JournalPage() {
  const [lead, ...rest] = POSTS;
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="What we keep having to explain."
        lead="Written by the people who run the sessions, mostly because the same questions come up on the floor every week."
      />
      <Section className="!pt-0">
        <Shell>
          <Link href={`/journal/${lead.slug}`} className="group block border border-hairline bg-bone p-8 transition-colors hover:bg-mist lg:p-14">
            <p className="eyebrow">{lead.category} · {lead.readMins} min read</p>
            <h2 className="display mt-6 max-w-[20ch] text-[clamp(2rem,5vw,3.6rem)] text-forest">{lead.title}</h2>
            <p className="mt-6 max-w-[62ch] text-[1.02rem] leading-relaxed text-muted">{lead.excerpt}</p>
            <p className="mt-8 flex items-center gap-2 text-[0.8rem] font-semibold text-forest">
              Read it <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </p>
          </Link>

          <Reveal selector="[data-po]" stagger={0.05} className="mt-3 grid gap-px bg-hairline md:grid-cols-2 xl:grid-cols-3">
            {rest.map((p) => (
              <Link data-po key={p.slug} href={`/journal/${p.slug}`}
                    className="group flex flex-col bg-canvas p-8 transition-colors hover:bg-bone">
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-lime">{p.category}</p>
                <h3 className="display mt-4 text-[1.55rem] leading-tight text-forest">{p.title}</h3>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">{p.excerpt}</p>
                <p className="tnum mt-7 text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  {fmt(p.date)} · {p.readMins} min
                </p>
              </Link>
            ))}
          </Reveal>
        </Shell>
      </Section>
      <FreeDayBand />
    </>
  );
}
