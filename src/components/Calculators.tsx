"use client";
import { useState } from "react";
import Button from "./Button";

/**
 * Asian-Indian BMI cut-offs (overweight ≥23, obese ≥25) rather than the older
 * WHO thresholds — they are what Indian clinical guidance uses.
 */
const band = (bmi: number) =>
  bmi < 18.5 ? { label: "Underweight", tone: "text-bark", program: "Build Up", slug: "build-up" }
  : bmi < 23 ? { label: "Healthy range", tone: "text-forest", program: "Reset 30", slug: "reset-30" }
  : bmi < 25 ? { label: "Overweight", tone: "text-bark", program: "Reset 30", slug: "reset-30" }
  : { label: "Obese", tone: "text-bark", program: "Transform 90", slug: "transform-90" };

function Field({ label, suffix, value, onChange, min, max }: {
  label: string; suffix: string; value: string; onChange: (v: string) => void; min: number; max: number;
}) {
  return (
    <label className="block">
      <span className="text-[0.62rem] uppercase tracking-[0.16em] text-muted">{label}</span>
      <span className="mt-2 flex items-center border border-hairline bg-bone focus-within:border-lime">
        <input type="number" inputMode="decimal" min={min} max={max} value={value}
               onChange={(e) => onChange(e.target.value)}
               className="tnum w-full bg-transparent px-4 py-3.5 text-[1.05rem] text-ink outline-none" />
        <span className="px-4 text-[0.78rem] text-muted">{suffix}</span>
      </span>
    </label>
  );
}

export default function Calculators() {
  const [h, setH] = useState("165");
  const [w, setW] = useState("74");
  const [age, setAge] = useState("38");
  const [sex, setSex] = useState<"female" | "male">("female");
  const [act, setAct] = useState(1.375);

  const hm = Number(h) / 100;
  const wk = Number(w);
  const ok = hm > 0.9 && hm < 2.4 && wk > 25 && wk < 250;

  const bmi = ok ? wk / (hm * hm) : 0;
  const b = band(bmi);
  const lo = ok ? 18.5 * hm * hm : 0;
  const hi = ok ? 22.9 * hm * hm : 0;

  const a = Number(age);
  const bmr = ok && a > 12 && a < 100
    ? 10 * wk + 6.25 * Number(h) - 5 * a + (sex === "male" ? 5 : -161)
    : 0;
  const tdee = bmr * act;

  return (
    <div className="grid gap-px bg-hairline lg:grid-cols-[0.9fr_1.1fr]">
      <div className="bg-canvas p-8 lg:p-10">
        <p className="eyebrow">Your numbers</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field label="Height" suffix="cm" value={h} onChange={setH} min={90} max={240} />
          <Field label="Weight" suffix="kg" value={w} onChange={setW} min={25} max={250} />
          <Field label="Age" suffix="yrs" value={age} onChange={setAge} min={13} max={99} />
          <label className="block">
            <span className="text-[0.62rem] uppercase tracking-[0.16em] text-muted">Sex</span>
            <span className="mt-2 grid grid-cols-2 gap-2">
              {(["female", "male"] as const).map((s) => (
                <button key={s} type="button" onClick={() => setSex(s)} aria-pressed={sex === s}
                  className={`border px-3 py-3.5 text-[0.85rem] font-semibold capitalize transition-colors ${
                    sex === s ? "border-forest bg-forest text-white" : "border-hairline text-forest hover:bg-mist"}`}>
                  {s}
                </button>
              ))}
            </span>
          </label>
        </div>

        <p className="mt-7 text-[0.62rem] uppercase tracking-[0.16em] text-muted">Daily activity</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[[1.2, "Desk-bound"], [1.375, "Light"], [1.55, "Moderate"], [1.725, "Hard"]].map(([v, l]) => (
            <button key={String(l)} type="button" onClick={() => setAct(v as number)} aria-pressed={act === v}
              className={`rounded-full border px-4 py-2 text-[0.78rem] font-semibold transition-colors ${
                act === v ? "border-forest bg-forest text-white" : "border-hairline text-forest hover:bg-mist"}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-bone p-8 lg:p-10">
        {!ok ? (
          <p className="text-[0.95rem] text-muted">Enter a height and weight to see your numbers.</p>
        ) : (
          <>
            <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-muted">BMI</p>
                <p className="display tnum mt-2 text-[clamp(3rem,7vw,4.6rem)] leading-none text-forest">{bmi.toFixed(1)}</p>
                <p className={`mt-2 text-[0.86rem] font-semibold ${b.tone}`}>{b.label}</p>
              </div>
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-muted">Healthy range for your height</p>
                <p className="display tnum mt-2 text-[2rem] leading-none text-forest">{lo.toFixed(0)}–{hi.toFixed(0)} kg</p>
              </div>
            </div>

            <div className="mt-9 grid gap-px bg-hairline sm:grid-cols-2">
              <div className="bg-bone py-5 pr-4">
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-muted">Resting burn (BMR)</p>
                <p className="display tnum mt-1.5 text-[1.6rem] text-forest">{Math.round(bmr)} kcal</p>
              </div>
              <div className="bg-bone py-5 pr-4 sm:pl-6">
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-muted">With your activity</p>
                <p className="display tnum mt-1.5 text-[1.6rem] text-forest">{Math.round(tdee)} kcal</p>
              </div>
            </div>

            <p className="mt-7 text-[0.82rem] leading-relaxed text-muted">
              These use Asian-Indian BMI cut-offs — overweight from 23, not 25 — because
              that is what Indian clinical guidance uses. A calculator cannot see your
              muscle, your reports or your medication. It is a starting point, not a diagnosis.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`/programs/${b.slug}`}>Likely fit: {b.program}</Button>
              <Button href="/free-day" variant="ghost">Get measured properly, free</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
