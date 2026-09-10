"use client";
import { useCallback, useRef, useState } from "react";

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/**
 * Draggable before/after divider. Pointer, touch and keyboard all drive the
 * same value, so it works on a phone and for a screen-reader user alike.
 */
export default function BeforeAfter({
  before, after, alt = "", initial = 52, className = "",
}: { before: string; after: string; alt?: string; initial?: number; className?: string }) {
  const [pos, setPos] = useState(initial);
  const box = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (r) setPos(clamp(((clientX - r.left) / r.width) * 100));
  }, []);

  return (
    <div
      ref={box}
      className={`relative select-none overflow-hidden border border-hairline bg-white ${className}`}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={before} alt={alt ? `${alt} — before` : ""} className="h-full w-full object-cover object-top" draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={after}
        alt={alt ? `${alt} — after` : ""}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-top"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      />

      <span aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-lime" style={{ left: `${pos}%` }} />

      <div
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => clamp(p - 4));
          if (e.key === "ArrowRight") setPos((p) => clamp(p + 4));
        }}
        className="absolute top-1/2 z-10 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-hairline bg-white shadow-[0_2px_14px_rgba(31,77,17,.18)]"
        style={{ left: `${pos}%` }}
      >
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
          <path d="M6 1 1 6l5 5M10 1l5 5-5 5" stroke="#1F4D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">
        Before
      </span>
      <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-forest px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white">
        After
      </span>
    </div>
  );
}
