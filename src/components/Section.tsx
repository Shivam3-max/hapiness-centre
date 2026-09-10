import type { ReactNode } from "react";

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1480px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function SectionHead({
  eyebrow, title, lead, align = "left",
}: { eyebrow: string; title: ReactNode; lead?: ReactNode; align?: "left" | "center" }) {
  const centred = align === "center";
  return (
    <header className={centred ? "text-center" : ""}>
      <p className={`eyebrow eyebrow-rule ${centred ? "justify-center" : ""}`}>{eyebrow}</p>
      {/* ch is measured in Anton here, which is condensed — so this is wide */}
      <h2 className={`display mt-7 max-w-[17ch] text-[clamp(2.3rem,6vw,4.8rem)] lowercase text-forest ${centred ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {lead && (
        <p className={`mt-6 max-w-[52ch] text-[1.04rem] leading-relaxed text-muted ${centred ? "mx-auto" : ""}`}>
          {lead}
        </p>
      )}
    </header>
  );
}

export default function Section({
  children, className = "", tone = "canvas", id, field = "grid", glow,
}: {
  children: ReactNode;
  className?: string;
  tone?: "canvas" | "bone" | "cream" | "mist" | "forest";
  id?: string;
  field?: "grid" | "dots" | "none";
  glow?: "amber" | "leaf" | "mist" | false;
}) {
  const tones = {
    canvas: "bg-canvas",
    bone: "bg-bone",
    cream: "bg-cream",
    mist: "bg-mist",
    forest: "bg-forest text-white/85",
  } as const;
  const dark = tone === "forest";

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden ${tones[tone]} py-[clamp(4.5rem,9vw,8rem)] ${className}`}
    >
      {glow && (
        <span
          aria-hidden
          className={`glow glow-${glow} -top-[18%] left-[58%] h-[38rem] w-[38rem] -translate-x-1/2`}
        />
      )}
      {field !== "none" && (
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 field-fade ${
            field === "dots" ? "field-dots" : "field-grid"
          } ${dark ? "field-dark" : ""}`}
        />
      )}
      <div className="relative">{children}</div>
    </section>
  );
}
