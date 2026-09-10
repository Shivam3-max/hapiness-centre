import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section, { Shell } from "@/components/Section";
import Button from "@/components/Button";
import { POSTS } from "@/data/journal";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const more = POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  const date = new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <article className="pt-[calc(76px+clamp(3rem,6vw,5.5rem))]">
        <Shell>
          <div className="mx-auto max-w-[68ch]">
            <p className="eyebrow">{p.category} · {p.readMins} min read</p>
            <h1 className="display mt-6 text-balance text-[clamp(2.2rem,5.6vw,4.2rem)] text-forest">{p.title}</h1>
            <p className="tnum mt-7 border-t border-hairline pt-5 text-[0.72rem] uppercase tracking-[0.14em] text-muted">{date}</p>
            <div className="mt-10 space-y-6">
              {p.body.map((para, i) => (
                <p key={i} className={i === 0
                  ? "text-[1.18rem] leading-relaxed text-ink"
                  : "text-[1.03rem] leading-relaxed text-muted"}>
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-14 border-t border-hairline pt-10">
              <p className="text-[0.86rem] leading-relaxed text-muted">
                General information, not medical advice. If you are managing a condition
                or taking prescription medication, speak to your doctor before changing
                how you eat or move.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/free-day">Try a day, free</Button>
                <Button href="/journal" variant="ghost">More from the journal</Button>
              </div>
            </div>
          </div>
        </Shell>
      </article>

      <Section tone="bone" className="mt-[clamp(4rem,8vw,7rem)]">
        <Shell>
          <p className="eyebrow">Keep reading</p>
          <div className="mt-8 grid gap-px bg-hairline md:grid-cols-3">
            {more.map((m) => (
              <Link key={m.slug} href={`/journal/${m.slug}`} className="group bg-bone p-8 transition-colors hover:bg-canvas">
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-lime">{m.category}</p>
                <h3 className="display mt-4 text-[1.4rem] leading-tight text-forest">{m.title}</h3>
              </Link>
            ))}
          </div>
        </Shell>
      </Section>
    </>
  );
}
