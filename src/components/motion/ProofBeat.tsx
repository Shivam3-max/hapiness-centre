"use client";
import Link from "next/link";
import { useFormation } from "../stage/useFormation";
import { TILES, STORY_COUNT, TOTAL_KG_LOST } from "@/data/stories";
import { PROOF } from "@/data/copy";

const STRIP = TILES.slice(0, 12);

/** The wall, compressed to one line and a moving ribbon. Detail lives on /transformations. */
export default function ProofBeat() {
  const section = useFormation<HTMLElement>("arc");
  return (
    <section ref={section} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-24">
      <div className="mx-auto w-full max-w-[52rem] px-5 text-center">
        <p className="eyebrow">{PROOF.eyebrow}</p>
        <h2 className="editor mt-8 text-[clamp(2.2rem,6.4vw,5rem)] leading-[1.03] text-forest">
          {STORY_COUNT} people.
          <br />
          <em className="italic text-amber-deep">{TOTAL_KG_LOST} kg</em> between them.
        </h2>
      </div>

      <div aria-hidden className="mt-14 flex overflow-hidden">
        <div className="ticker flex shrink-0 gap-3 pr-3" style={{ ["--dur" as string]: "64s" }}>
          {[...STRIP, ...STRIP].map((t, i) => (
            <span key={i} className="relative block aspect-square h-[clamp(120px,17vh,190px)] shrink-0 overflow-hidden border border-hairline bg-white">
              <span className="grid h-full grid-cols-2">
                {[t.view.before, t.view.after].map((s, j) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={j} src={s.src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
                ))}
              </span>
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-amber/70" />
            </span>
          ))}
        </div>
      </div>

      <div className="mt-14 text-center">
        <Link href="/transformations"
              className="inline-flex min-h-11 items-center gap-2.5 py-2 text-[0.9rem] font-semibold text-forest">
          See all {STORY_COUNT} people
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full border border-amber text-amber-deep">→</span>
        </Link>
      </div>
    </section>
  );
}
