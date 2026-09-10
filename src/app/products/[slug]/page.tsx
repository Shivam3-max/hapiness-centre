import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Section, { Shell } from "@/components/Section";
import Button from "@/components/Button";
import { PRODUCTS } from "@/data/content";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.line } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const idx = PRODUCTS.indexOf(p);

  return (
    <>
      <PageHero eyebrow={p.kind} title={p.name} lead={p.line} />
      <Section className="!pt-0">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <span aria-hidden className="grid aspect-square w-full place-items-center border border-hairline bg-mist">
              <span className="display tnum text-[6rem] text-lime/45">{String(idx + 1).padStart(2, "0")}</span>
            </span>
            <div>
              <p className="text-[1.05rem] leading-relaxed text-ink">{p.body}</p>
              <div className="mt-9 grid gap-px bg-hairline sm:grid-cols-2">
                <div className="bg-canvas p-6">
                  <p className="text-[0.62rem] uppercase tracking-[0.16em] text-muted">How to take it</p>
                  <p className="mt-2 text-[0.95rem] leading-snug text-ink">{p.use}</p>
                </div>
                <div className="bg-canvas p-6">
                  <p className="text-[0.62rem] uppercase tracking-[0.16em] text-muted">Cost</p>
                  <p className="mt-2 text-[0.95rem] leading-snug text-ink">Included in your programme fee.</p>
                </div>
              </div>
              <p className="mt-8 border-l-2 border-lime bg-mist px-6 py-5 text-[0.86rem] leading-relaxed text-forest">
                A nutritional supplement, not a medicine. It does not treat, cure or prevent
                disease. Check with your doctor before starting it if you take prescription
                medication.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/free-day">Try a day, kit included</Button>
                <Button href="/products" variant="ghost">All six items</Button>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-hairline pt-8">
            <p className="eyebrow">The rest of the kit</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {PRODUCTS.filter((x) => x.slug !== p.slug).map((o) => (
                <Link key={o.slug} href={`/products/${o.slug}`}
                      className="rounded-full border border-hairline px-5 py-2.5 text-[0.82rem] font-semibold text-forest hover:bg-mist">
                  {o.name}
                </Link>
              ))}
            </div>
          </div>
        </Shell>
      </Section>
    </>
  );
}
