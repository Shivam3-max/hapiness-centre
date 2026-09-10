import Button from "../Button";
import { Shell } from "../Section";
import FreeBadge from "../heroes/FreeBadge";

export default function FreeDayBand() {
  return (
    <section id="free-day-band" className="relative isolate overflow-hidden bg-forest py-[clamp(4.5rem,9vw,8rem)] text-white/80">
      <span aria-hidden className="glow glow-amber -bottom-[26%] left-[18%] h-[34rem] w-[34rem]" style={{ ["--go" as string]: ".38" }} />
      <span aria-hidden className="pointer-events-none absolute inset-0 field-grid field-dark field-fade" />
      <Shell className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <p className="eyebrow eyebrow-rule text-amber before:bg-amber">No card, no commitment</p>
            <h2 className="display mt-8 max-w-[13ch] text-[clamp(2.6rem,8vw,6.5rem)] lowercase text-white">
              Live one day of it. <span className="text-amber">Free.</span>
            </h2>
            <p className="mt-8 max-w-[54ch] text-[1.04rem] leading-relaxed text-white/65">
              One prepared meal from your plan, the morning ritual, the movement set, a
              body composition reading, and a coach on WhatsApp for the day.
            </p>
            <div className="mt-11 flex flex-wrap gap-3">
              <Button href="/free-day" variant="light">Book your free day</Button>
              <Button href="/consultation" variant="outlineLight">Talk to a dietitian first</Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <FreeBadge className="h-40 w-40 [&_text]:fill-white lg:h-52 lg:w-52" />
          </div>
        </div>

        <dl className="mt-16 grid gap-px border-t border-white/15 sm:grid-cols-3">
          {[["7:00 am", "Doors open"], ["8:30 – 10:30", "Morning session"], ["6:30 pm", "Class, online"]].map(([n, l]) => (
            <div key={l} className="pt-7">
              <dt className="display tnum text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none text-amber">{n}</dt>
              <dd className="mt-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-white/45">{l}</dd>
            </div>
          ))}
        </dl>
      </Shell>
    </section>
  );
}
