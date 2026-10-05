import type { Metadata } from "next";
import Link from "next/link";
import TransformSequence from "@/components/motion/TransformSequence";
import { STORY_COUNT, TOTAL_KG_LOST } from "@/data/stories";

export const metadata: Metadata = {
  title: "Transformations",
  description: `${STORY_COUNT} members of Happiness Centre, photographed months apart on the same wall in Zirakpur.`,
};

export default function TransformationsPage() {
  return (
    <>
      {/* opening */}
      <section className="relative flex min-h-[100svh] items-center justify-center px-5 pt-[76px] text-center">
        <div className="max-w-[46rem]">
          <p className="eyebrow">Real people, real results</p>
          <h1 className="editor mt-8 text-[clamp(2.4rem,7vw,5.6rem)] leading-[1.03] text-forest">
            Same wall.
            <br />
            Months <em className="italic text-amber-deep">apart.</em>
          </h1>
          <p className="mx-auto mt-8 max-w-[34ch] text-[1rem] leading-relaxed text-muted">
            {STORY_COUNT} members of our centre in Zirakpur. No models. No editing.
            Together they are {TOTAL_KG_LOST} kg lighter.
          </p>
          <p className="mt-10 text-[0.7rem] uppercase tracking-[0.22em] text-muted">
            Scroll to meet them
          </p>
        </div>
      </section>

      <TransformSequence />

      {/* close */}
      <section className="relative flex min-h-[80svh] items-center justify-center px-5 text-center">
        <div className="max-w-[40rem]">
          <h2 className="editor text-[clamp(2.2rem,6vw,4.4rem)] leading-[1.04] text-forest">
            Your photo could be
            <br />
            the <em className="italic text-amber-deep">next one.</em>
          </h2>
          <p className="mx-auto mt-7 max-w-[34ch] text-[1rem] leading-relaxed text-muted">
            We take the first picture on day one. The first day is free, online or at
            the centre.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/free-day"
                  className="rounded-full bg-forest px-8 py-4 text-[0.92rem] font-semibold text-white transition-colors hover:bg-bark">
              Take your free day →
            </Link>
            <Link href="/programs"
                  className="rounded-full border border-hairline bg-white/60 px-8 py-4 text-[0.92rem] font-semibold text-forest backdrop-blur-sm transition-colors hover:bg-mist">
              See the programmes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
