"use client";
import Link from "next/link";
import { useState } from "react";
import { useFormation } from "../stage/useFormation";
import { CLOSE } from "@/data/copy";

const MODES = {
  centre: {
    label: "At the centre",
    line: "Come in at 7:30. Do the class, take the drink, sit with a dietitian, walk out with a reading.",
    href: "/free-day?mode=centre",
  },
  online: {
    label: "Online",
    line: "Join the 6:30 evening class from home. Same plan, same coach, same check-in on WhatsApp.",
    href: "/free-day?mode=online",
  },
} as const;

export default function FreeDayClose() {
  const section = useFormation<HTMLElement>("disc");
  const [mode, setMode] = useState<keyof typeof MODES>("centre");
  const m = MODES[mode];

  return (
    <section ref={section} className="relative flex min-h-[100svh] items-center justify-center px-5 py-24">
      <div className="w-full max-w-[46rem] text-center">
        <p className="eyebrow">{CLOSE.eyebrow}</p>

        <h2 className="editor mt-8 text-[clamp(2.4rem,7.4vw,6rem)] leading-[1.02] text-forest">
          {CLOSE.line1}
          <br />
          {CLOSE.line2} <em className="italic text-amber-deep">{CLOSE.accent}</em>.
        </h2>

        <div className="mt-10 inline-flex rounded-full border border-hairline bg-white/70 p-1 backdrop-blur-sm">
          {(Object.keys(MODES) as (keyof typeof MODES)[]).map((k) => (
            <button key={k} onClick={() => setMode(k)} aria-pressed={mode === k}
              className={`rounded-full px-6 py-2.5 text-[0.82rem] font-semibold transition-colors ${
                mode === k ? "bg-forest text-white" : "text-forest hover:bg-mist"}`}>
              {MODES[k].label}
            </button>
          ))}
        </div>

        <p key={mode} className="enter mx-auto mt-8 max-w-[42ch] text-[1rem] leading-relaxed text-muted">
          {m.line}
        </p>

        <div className="mt-10">
          <Link href={m.href}
                className="inline-flex rounded-full bg-forest px-9 py-4 text-[0.95rem] font-semibold text-white transition-colors hover:bg-bark">
            Book it — {m.label.toLowerCase()} →
          </Link>
        </div>
      </div>
    </section>
  );
}
