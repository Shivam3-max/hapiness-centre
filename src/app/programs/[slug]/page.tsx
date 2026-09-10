import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Section, { Shell, SectionHead } from "@/components/Section";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import FreeDayBand from "@/components/home/FreeDayBand";
import { PROGRAMS, PILLARS } from "@/data/content";
import { STORIES, kgLabel } from "@/data/stories";

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROGRAMS.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROGRAMS.find((x) => x.slug === slug);
  if (!p) notFound();

  const proof = STORIES.filter((s) => s.goal === p.goal).slice(0, 4);
  const others = PROGRAMS.filter((x) => x.slug !== p.slug);

  return (
    <>
      <PageHero
        eyebrow={`${p.days}-day programme`}
        title={p.name}
        lead={<><span className="block text-[1.15rem] leading-snug text-ink">{p.tagline}</span><span className="mt-4 block">{p.who}</span></>}
      />

      <Section className="!pt-0">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <div>
              <p className="eyebrow">What’s included</p>
              <ul className="mt-7 grid gap-px bg-hairline">
                {p.includes.map((i) => (
                  <li key={i} className="flex gap-4 bg-canvas py-5 pr-4 text-[0.98rem] leading-snug text-ink">
                    <span aria-hidden className="mt-[0.55rem] h-px w-5 shrink-0 bg-lime" />
                    {i}
                  </li>
                ))}
              </ul>
              {p.note && (
                <p className="mt-8 border-l-2 border-lime bg-mist px-6 py-5 text-[0.88rem] leading-relaxed text-forest">
                  {p.note}
                </p>
              )}
            </div>

            <div>
              <p className="eyebrow">How it runs</p>
              <ol className="mt-7 space-y-px">
                {p.rhythm.map((r, i) => (
                  <li key={r} className="flex gap-5 border border-hairline bg-bone px-6 py-6">
                    <span className="tnum display text-[1.5rem] leading-none text-lime">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.95rem] leading-snug text-ink">{r}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/free-day">Try one day free</Button>
                <Button href="/consultation" variant="ghost">Ask a question first</Button>
              </div>
            </div>
          </div>
        </Shell>
      </Section>

      {proof.length > 0 && (
        <Section tone="bone">
          <Shell>
            <SectionHead eyebrow="On this programme" title={`People who did ${p.name}.`} />
            <Reveal selector="[data-s]" stagger={0.06} className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {proof.map((s) => (
                <Link data-s key={s.id} href="/transformations" className="group block overflow-hidden border border-hairline bg-white">
                  <span className="relative block aspect-[3/5] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.views[0].before.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.views[0].after.src} alt="" loading="lazy"
                         className="absolute inset-0 h-full w-full object-cover object-top transition-[clip-path] duration-700 [clip-path:inset(0_0_0_0)] group-hover:[clip-path:inset(0_0_0_100%)]" />
                  </span>
                  <span className="flex items-baseline justify-between border-t border-hairline px-3.5 py-3">
                    <span className="display tnum text-[1.25rem] text-forest">{kgLabel(s.kg)}</span>
                    <span className="text-[0.6rem] uppercase tracking-[0.13em] text-muted">{s.months} mo</span>
                  </span>
                </Link>
              ))}
            </Reveal>
          </Shell>
        </Section>
      )}

      <Section>
        <Shell>
          <SectionHead eyebrow="Inside every programme" title="The same four pillars, every day." />
          <div className="mt-12 grid gap-px bg-hairline md:grid-cols-2 xl:grid-cols-4">
            {PILLARS.map((pl) => (
              <div key={pl.n} className="bg-canvas p-7">
                <p className="tnum text-[0.68rem] font-semibold tracking-[0.2em] text-lime">{pl.n}</p>
                <h3 className="display mt-4 text-[1.5rem] text-forest">{pl.name}</h3>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-muted">{pl.line}</p>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="bone" className="!py-[clamp(3rem,6vw,5rem)]">
        <Shell>
          <p className="eyebrow">Other programmes</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/programs/${o.slug}`}
                    className="rounded-full border border-hairline px-5 py-2.5 text-[0.82rem] font-semibold text-forest hover:bg-mist">
                {o.name}
              </Link>
            ))}
          </div>
        </Shell>
      </Section>

      <FreeDayBand />
    </>
  );
}
