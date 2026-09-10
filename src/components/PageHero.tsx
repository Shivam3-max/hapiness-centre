import type { ReactNode } from "react";
import { Shell } from "./Section";

export default function PageHero({
  eyebrow, title, lead, aside, tone = "canvas",
}: { eyebrow: string; title: ReactNode; lead?: ReactNode; aside?: ReactNode; tone?: "canvas" | "bone" }) {
  return (
    <section className={`relative isolate overflow-hidden ${tone === "bone" ? "bg-bone" : "bg-canvas"} pt-[calc(76px+clamp(3.5rem,7vw,6.5rem))] pb-[clamp(3rem,6vw,5rem)]`}>
      <span aria-hidden className="glow glow-mist -top-[30%] left-[72%] h-[34rem] w-[34rem] -translate-x-1/2" />
      <span aria-hidden className="pointer-events-none absolute inset-0 field-grid field-fade" />
      <Shell className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-rule">{eyebrow}</p>
            <h1 className="display mt-7 max-w-[15ch] text-[clamp(2.6rem,7.6vw,6.4rem)] lowercase text-forest">{title}</h1>
          </div>
          <div>
            {lead && <p className="max-w-[52ch] text-[1.02rem] leading-relaxed text-muted">{lead}</p>}
            {aside}
          </div>
        </div>
      </Shell>
      <Shell className="relative mt-[clamp(2.5rem,5vw,4rem)]">
        <hr className="border-0 border-t border-hairline" />
      </Shell>
    </section>
  );
}
