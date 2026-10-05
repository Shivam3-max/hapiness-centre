"use client";
import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scrollStore";

/** 7:00 am to 7:00 pm, advancing as you scroll. The day is the spine. */
const START = 7 * 60;
const END = 19 * 60;

const band = (mins: number) =>
  mins < 9 * 60 ? "Morning" : mins < 12 * 60 ? "Late morning" : mins < 16 * 60 ? "Afternoon" : "Evening";

export default function DayClock() {
  const time = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const dot = useRef<HTMLSpanElement>(null);

  useEffect(() =>
    subscribeScroll(({ progress }) => {
      const mins = Math.round(START + (END - START) * progress);
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      if (time.current) {
        time.current.textContent =
          `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")}`;
      }
      if (label.current) label.current.textContent = band(mins);
      if (dot.current) dot.current.style.top = `${progress * 100}%`;
    }), []);

  return (
    <aside aria-hidden
           className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      <span ref={time} className="tnum text-[0.68rem] font-semibold tracking-[0.1em] text-forest">7:00</span>
      <span className="relative h-[34vh] w-px bg-hairline">
        <span ref={dot}
              className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber ring-4 ring-canvas"
              style={{ top: "0%" }} />
      </span>
      <span ref={label}
            className="text-[0.7rem] lg:text-[0.6rem] uppercase tracking-[0.26em] text-muted [writing-mode:vertical-rl]">
        Morning
      </span>
    </aside>
  );
}
