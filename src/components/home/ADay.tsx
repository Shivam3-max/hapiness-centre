"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DAY } from "@/data/content";
import Button from "../Button";

gsap.registerPlugin(ScrollTrigger);

/**
 * Horizontal scrub through one day.
 *
 * Uses native `position: sticky` rather than ScrollTrigger's `pin`. Pinning
 * wraps the element in a pin-spacer, which re-parents it — React then fails to
 * remove it on unmount ("removeChild ... not a child of this node") and every
 * client-side navigation away from this page dies. Sticky touches no DOM.
 */
export default function ADay() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = outer.current;
    const el = track.current;
    if (!section || !el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || document.documentElement.hasAttribute("data-still")) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 64);
      const setHeight = () => {
        section.style.height = `${window.innerHeight + distance()}px`;
      };
      setHeight();

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      const onResize = () => { setHeight(); ScrollTrigger.refresh(); };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(el, { clearProps: "transform" });
        section.style.height = "";
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="day" ref={outer} className="relative isolate bg-forest text-white/85">
      <span aria-hidden className="pointer-events-none absolute inset-0 field-grid field-dark" />
      <div className="relative sticky top-0 flex min-h-[100svh] flex-col justify-center overflow-hidden py-[clamp(3rem,7vw,5rem)] lg:h-[100svh]">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <p className="eyebrow eyebrow-rule text-amber before:bg-amber">A day at Happiness Centre</p>
          <h2 className="display mt-7 max-w-[15ch] text-[clamp(2.3rem,6vw,4.8rem)] lowercase text-white">
            Doors at seven. Everybody moves at half eight.
          </h2>
          <p className="mt-6 max-w-[54ch] text-[0.98rem] leading-relaxed text-white/65">
            The morning session runs 8:30 to 10:30, led by Mr. Sandeep Kumar and the
            coaching team. The evening class runs online at 6:30, so a working day
            never costs you the whole programme.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto pb-4 [scrollbar-width:none] lg:mt-14 lg:overflow-visible">
          <div ref={track} className="flex snap-x snap-mandatory gap-4 px-5 sm:px-8 lg:snap-none">
            {DAY.map((h, i) => (
              <article key={`${h.time}-${i}`}
                className="relative w-[78vw] shrink-0 snap-start border border-white/18 p-7 sm:w-[52vw] sm:p-8 lg:w-[27rem] lg:p-10">
                <span aria-hidden className="absolute -top-px left-0 h-2 w-2 border-l border-t border-amber" />
                <p className="tnum display text-[2.6rem] leading-none text-amber">{h.time}</p>
                <h3 className="display mt-6 text-[1.9rem] lowercase text-white">{h.title}</h3>
                <p className="mt-4 text-[0.94rem] leading-relaxed text-white/70">{h.body}</p>
                <p className="tnum mt-10 text-[0.62rem] uppercase tracking-[0.2em] text-white/35">
                  {String(i + 1).padStart(2, "0")} / {String(DAY.length).padStart(2, "0")}
                </p>
              </article>
            ))}

            <article className="flex w-[78vw] shrink-0 snap-start flex-col justify-center border border-amber/40 bg-amber/10 p-7 sm:w-[52vw] sm:p-8 lg:w-[27rem] lg:p-10">
              <h3 className="display text-[2.4rem] lowercase text-white">Tomorrow costs money.<br />Today doesn’t.</h3>
              <p className="mt-4 text-[0.94rem] leading-relaxed text-white/70">
                Come in, eat the food, do the set, take the reading. Decide afterwards.
              </p>
              <Button href="/free-day" variant="light" className="mt-8 self-start">Book your free day</Button>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
