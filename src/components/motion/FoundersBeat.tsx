import Link from "next/link";
import Placeholder from "./Placeholder";
import { COACHES } from "@/data/content";
import { FOUNDERS } from "@/data/copy";

export default function FoundersBeat() {
  return (
    <section className="relative flex min-h-[100svh] items-center py-24">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <div className="max-w-[40rem]">
          <p className="eyebrow">{FOUNDERS.eyebrow}</p>
          <h2 className="editor mt-7 text-[clamp(2.1rem,5.6vw,4.2rem)] leading-[1.04] text-forest">
{FOUNDERS.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:gap-12">
          {COACHES.map((c, i) => (
            <article key={c.name}>
              <Placeholder fig={`0${i + 7}`} caption={c.name} className="aspect-4/5 w-full" />
              <h3 className="editor mt-6 text-[1.6rem] text-forest">{c.name}</h3>
              <p className="mt-1.5 text-[0.66rem] uppercase tracking-[0.18em] text-amber-deep">{c.role}</p>
            </article>
          ))}
        </div>

        <Link href="/coaches" className="mt-12 inline-flex items-center gap-2.5 text-[0.9rem] font-semibold text-forest">
          The whole story
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full border border-amber text-amber-deep">→</span>
        </Link>
      </div>
    </section>
  );
}
