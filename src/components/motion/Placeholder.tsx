/** Clearly-marked image slot. Swap `src` in when the real photograph arrives. */
export default function Placeholder({
  fig, caption, className = "", src,
}: { fig: string; caption: string; className?: string; src?: string }) {
  return (
    <figure className={`relative overflow-hidden border border-hairline bg-mist shadow-[0_18px_60px_-30px_rgba(31,77,17,.4)] ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={caption} className="h-full w-full object-cover object-top" />
      ) : (
        <span className="absolute inset-0 grid place-items-center">
          { }
          <span className="flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-mark.svg" alt="" className="h-14 w-auto opacity-40" />
            <span className="text-[0.7rem] lg:text-[0.6rem] uppercase tracking-[0.2em] text-muted">Photograph to come</span>
          </span>
        </span>
      )}
      <span aria-hidden className="absolute -top-px -left-px h-3 w-3 border-l border-t border-amber" />
      <span aria-hidden className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-amber" />
      <figcaption className="absolute bottom-3 left-3 text-[0.7rem] lg:text-[0.6rem] uppercase tracking-[0.18em] text-forest/70">
        fig. {fig} — {caption}
      </figcaption>
    </figure>
  );
}
