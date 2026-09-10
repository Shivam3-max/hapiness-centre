import { Shell } from "./Section";

export default function LegalPage({
  title, updated, sections,
}: { title: string; updated: string; sections: { h: string; p: string[] }[] }) {
  return (
    <article className="pt-[calc(76px+clamp(3rem,6vw,5.5rem))] pb-[clamp(4rem,8vw,7rem)]">
      <Shell>
        <div className="mx-auto max-w-[70ch]">
          <h1 className="display text-[clamp(2.2rem,5.5vw,4rem)] text-forest">{title}</h1>
          <p className="mt-5 border-b border-hairline pb-6 text-[0.72rem] uppercase tracking-[0.14em] text-muted">
            Last updated {updated}
          </p>
          <div className="mt-10 space-y-11">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="display text-[1.55rem] text-forest">{s.h}</h2>
                {s.p.map((t, i) => (
                  <p key={i} className="mt-4 text-[1rem] leading-relaxed text-muted">{t}</p>
                ))}
              </section>
            ))}
          </div>
          <p className="mt-14 border-t border-hairline pt-7 text-[0.82rem] leading-relaxed text-muted">
            This is a placeholder document. Have it reviewed by a qualified professional
            before the site goes live.
          </p>
        </div>
      </Shell>
    </article>
  );
}
