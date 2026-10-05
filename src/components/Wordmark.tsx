export default function Wordmark({ className = "h-8 sm:h-9" }: { className?: string }) {
  return (
    <span className="flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-mark.svg" alt="" className={className} width={64} height={66} />
      <span className="leading-[0.86]">
        <span className="block font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-forest">
          Happiness
        </span>
        <span className="block text-[0.7rem] lg:text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-leaf">
          Centre
        </span>
      </span>
      <span className="sr-only">Happiness Centre</span>
    </span>
  );
}
