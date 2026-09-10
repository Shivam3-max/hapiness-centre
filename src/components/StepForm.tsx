"use client";
import { useMemo, useState } from "react";

export type Step =
  | { key: string; kind: "choice"; label: string; hint?: string; options: string[] }
  | { key: string; kind: "text" | "tel" | "date" | "textarea"; label: string; hint?: string; placeholder?: string };

const isValid = (s: Step, v: string) => {
  if (!v?.trim()) return false;
  if (s.kind === "tel") return /^[6-9]\d{9}$/.test(v.replace(/\D/g, ""));
  if (s.kind === "text") return v.trim().length >= 2;
  return true;
};

/**
 * One question per screen. No backend yet — submission is collected in state
 * and handed to onDone. See README → Before launch.
 */
export default function StepForm({
  steps, submitLabel = "Confirm", doneTitle, doneBody,
}: { steps: Step[]; submitLabel?: string; doneTitle: string; doneBody: string }) {
  const [i, setI] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [touched, setTouched] = useState(false);

  const step = steps[i];
  const value = data[step?.key] ?? "";
  const ok = useMemo(() => (step ? isValid(step, value) : false), [step, value]);
  const set = (v: string) => setData((d) => ({ ...d, [step.key]: v }));

  const next = () => {
    if (!ok) return setTouched(true);
    setTouched(false);
    if (i === steps.length - 1) setDone(true);
    else setI(i + 1);
  };

  if (done) {
    return (
      <div className="border border-hairline bg-mist p-9 text-center sm:p-14">
        <span aria-hidden className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest text-[1.4rem] text-white">✓</span>
        <h3 className="display mt-7 text-[clamp(1.8rem,4vw,2.7rem)] text-forest">{doneTitle}</h3>
        <p className="mx-auto mt-4 max-w-[46ch] text-[0.95rem] leading-relaxed text-muted">{doneBody}</p>
        <dl className="mx-auto mt-9 grid max-w-[28rem] gap-px bg-hairline text-left">
          {steps.map((s) => (
            <div key={s.key} className="flex items-baseline justify-between gap-4 bg-canvas px-5 py-3.5">
              <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-muted">{s.label}</dt>
              <dd className="text-[0.88rem] font-medium text-ink">{data[s.key]}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  return (
    <div className="border border-hairline bg-canvas p-7 sm:p-10">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-hairline">
          <div className="h-px bg-lime transition-[width] duration-500" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
        </div>
        <span className="tnum shrink-0 text-[0.62rem] uppercase tracking-[0.16em] text-muted">
          {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
        </span>
      </div>

      <label htmlFor={step.key} className="display mt-9 block text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight text-forest">
        {step.label}
      </label>
      {step.hint && <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">{step.hint}</p>}

      <div className="mt-8">
        {step.kind === "choice" ? (
          <div className="flex flex-wrap gap-2">
            {step.options.map((o) => (
              <button key={o} type="button" onClick={() => { set(o); setTouched(false); }}
                aria-pressed={value === o}
                className={`rounded-full border px-5 py-3 text-[0.86rem] font-semibold transition-colors ${
                  value === o ? "border-forest bg-forest text-white" : "border-hairline text-forest hover:bg-mist"}`}>
                {o}
              </button>
            ))}
          </div>
        ) : step.kind === "textarea" ? (
          <textarea id={step.key} rows={4} value={value} placeholder={step.placeholder}
            onChange={(e) => set(e.target.value)}
            className="w-full border border-hairline bg-bone px-5 py-4 text-[1rem] text-ink outline-none focus:border-lime" />
        ) : (
          <input id={step.key} type={step.kind === "tel" ? "tel" : step.kind === "date" ? "date" : "text"}
            inputMode={step.kind === "tel" ? "numeric" : undefined}
            value={value} placeholder={step.placeholder}
            onChange={(e) => set(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && next()}
            className="w-full border border-hairline bg-bone px-5 py-4 text-[1.05rem] text-ink outline-none focus:border-lime" />
        )}
      </div>

      {touched && !ok && (
        <p role="alert" className="mt-4 text-[0.82rem] text-bark">
          {step.kind === "tel" ? "Please enter a 10-digit mobile number." : "Please fill this in to continue."}
        </p>
      )}

      <div className="mt-9 flex items-center gap-3">
        {i > 0 && (
          <button type="button" onClick={() => { setI(i - 1); setTouched(false); }}
                  className="text-[0.84rem] font-semibold text-muted underline underline-offset-4 hover:text-forest">
            Back
          </button>
        )}
        <button type="button" onClick={next}
                className="ml-auto rounded-full bg-forest px-7 py-3.5 text-[0.88rem] font-semibold text-white transition-colors hover:bg-bark">
          {i === steps.length - 1 ? submitLabel : "Continue"}
        </button>
      </div>
    </div>
  );
}
