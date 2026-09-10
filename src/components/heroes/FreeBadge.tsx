export default function FreeBadge({ className = "h-28 w-28" }: { className?: string }) {
  return (
    <span className={`relative grid shrink-0 place-items-center ${className}`}>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite]" aria-hidden>
        <defs>
          <path id="badge-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text className="fill-forest" style={{ fontSize: 13.5, letterSpacing: "0.24em", fontWeight: 700 }}>
          <textPath href="#badge-ring" startOffset="0%">
            DAY ONE IS FREE · DAY ONE IS FREE ·
          </textPath>
        </text>
      </svg>
      <span className="grid h-[52%] w-[52%] place-items-center rounded-full bg-amber text-forest">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="sr-only">Day one is free</span>
    </span>
  );
}
