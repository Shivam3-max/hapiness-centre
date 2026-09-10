"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { STORIES, STORY_COUNT, TOTAL_KG_LOST, kgLabel } from "@/data/stories";

const WORDS = ["weight loss.", "weight gain.", "diabetes.", "thyroid.", "PCOS.", "stress.", "you."];
const TYPE_MS = 70, DELETE_MS = 34, HOLD_MS = 1300;

const CONCERNS = ["Overweight", "Underweight", "Diabetes", "Thyroid", "PCOS", "Stress", "Cholesterol", "Blood pressure"];

function Pill({ children, className = "", dl = "0s" }: { children: ReactNode; className?: string; dl?: string }) {
  return (
    <span style={{ ["--dl" as string]: dl }}
          className={`floaty frosted absolute whitespace-nowrap rounded-full border border-hairline px-4 py-2 text-[0.78rem] font-medium text-muted shadow-[0_2px_10px_rgba(31,77,17,.06)] ${className}`}>
      {children}
    </span>
  );
}

function Card({ children, className = "", dl = "0s" }: { children: ReactNode; className?: string; dl?: string }) {
  return (
    <div style={{ ["--dl" as string]: dl }}
         className={`floaty frosted absolute rounded-2xl border border-hairline p-4 shadow-[0_10px_30px_rgba(31,77,17,.09)] ${className}`}>
      {children}
    </div>
  );
}

/** A before/after diptych that pops in, then drifts. */
function Frame({ i, className = "", dl = "0s" }: { i: number; className?: string; dl?: string }) {
  const s = STORIES[i];
  const v = s.views[0];
  return (
    <div style={{ ["--dl" as string]: dl }} className={`popin absolute ${className}`}>
      <div className="floaty frosted overflow-hidden rounded-2xl border border-hairline p-1.5 shadow-[0_14px_40px_rgba(31,77,17,.16)]"
           style={{ ["--dl" as string]: dl }}>
        <div className="relative grid aspect-square w-full grid-cols-2 overflow-hidden rounded-xl">
          {[v.before, v.after].map((sh, j) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={j} src={sh.src} alt="" loading="eager" decoding="async" className="h-full w-full object-cover object-top" />
          ))}
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-amber" />
        </div>
        <p className="flex items-baseline justify-between px-1.5 pb-0.5 pt-2">
          <span className="tnum text-[0.92rem] font-bold leading-none text-forest">{kgLabel(s.kg)}</span>
          <span className="text-[0.58rem] uppercase tracking-[0.12em] text-muted">{s.months} mo</span>
        </p>
      </div>
    </div>
  );
}

export default function HeroConstellation() {
  // seeded with the first word so SSR, reduced-motion and the first paint all
  // show real type — never an empty line
  const [text, setText] = useState(WORDS[0]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || document.documentElement.hasAttribute("data-still")) return;

    let word = 0, char = WORDS[0].length, deleting = true, cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const target = WORDS[word];
      if (!deleting) {
        char += 1;
        setText(target.slice(0, char));
        if (char === target.length) {
          deleting = true;
          timer.current = setTimeout(tick, HOLD_MS);
          return;
        }
        timer.current = setTimeout(tick, TYPE_MS);
      } else {
        char -= 1;
        setText(target.slice(0, char));
        if (char === 0) {
          deleting = false;
          word = (word + 1) % WORDS.length;
        }
        timer.current = setTimeout(tick, char === 0 ? 260 : DELETE_MS);
      }
    };
    timer.current = setTimeout(tick, HOLD_MS);
    return () => { cancelled = true; if (timer.current) clearTimeout(timer.current); };
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-canvas pt-[76px]">
      <span aria-hidden className="glow glow-mist left-[14%] top-[6%] h-[30rem] w-[30rem]" style={{ ["--go" as string]: ".55" }} />
      <span aria-hidden className="glow glow-amber right-[8%] top-[52%] h-[26rem] w-[26rem]" style={{ ["--go" as string]: ".3" }} />
      <span aria-hidden className="pointer-events-none absolute inset-0 field-grid field-fade" />
      <div aria-hidden className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(52% 44% at 50% 42%, rgba(255,255,255,.94) 45%, rgba(255,255,255,0) 100%)" }} />

      {/*
        The constellation lives in two gutter columns either side of a reserved
        820px centre track. Percentage positions inside the whole section put
        frames on top of the headline on short laptops (1280x800, 1366x768);
        gutters make overlap structurally impossible at any size.
      */}
      <div aria-hidden
           className="pointer-events-none absolute inset-0 hidden lg:grid lg:grid-cols-[1fr_660px_1fr] xl:grid-cols-[1fr_820px_1fr]">
        {/* left gutter */}
        <div className="relative">
          <Pill className="left-[6%] top-[17%]" dl="0s">Weight loss</Pill>
          <Pill className="left-[9%] top-[74%] hidden xl:inline-flex [@media(max-height:840px)]:hidden" dl=".9s">Thyroid</Pill>

          <Card className="left-[4%] top-[31%] w-[172px] hidden 2xl:block" dl="1.2s">
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-muted">Body composition</p>
            <p className="tnum mt-1.5 text-[1.6rem] font-bold leading-none text-forest">78.4</p>
            <p className="mt-1.5 text-[0.7rem] font-semibold text-leaf">↓ 3.6 kg this month</p>
            <svg viewBox="0 0 120 30" className="mt-2 w-full" aria-hidden>
              <polyline points="0,5 20,8 40,7 60,14 80,15 100,21 120,24" fill="none"
                        stroke="var(--color-amber)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="120" cy="24" r="3" fill="var(--color-forest)" />
            </svg>
          </Card>

          <Card className="left-[6%] top-[62%] w-[164px] hidden 2xl:block [@media(max-height:900px)]:hidden" dl="3.1s">
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-muted">Adherence</p>
            <p className="tnum mt-1.5 text-[1.6rem] font-bold leading-none text-forest">86%</p>
            <p className="mt-1.5 text-[0.7rem] text-muted">Last 30 days</p>
          </Card>

          <Frame i={2}  className="right-[7%] top-[15%] w-[116px]" dl=".35s" />
          <Frame i={13} className="right-[13%] top-[55%] w-[116px] hidden xl:block [@media(max-height:840px)]:hidden" dl="2.6s" />
        </div>

        {/* centre track — deliberately empty, the type owns it */}
        <div />

        {/* right gutter */}
        <div className="relative">
          <Pill className="right-[6%] top-[19%]" dl="1.5s">PCOS</Pill>
          <Pill className="right-[9%] top-[76%] hidden xl:inline-flex [@media(max-height:840px)]:hidden" dl=".4s">Cholesterol</Pill>

          <Card className="right-[4%] top-[33%] w-[204px] hidden 2xl:block" dl="2.1s">
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-muted">Today at the centre</p>
            <ul className="mt-2.5 space-y-1.5 text-[0.76rem]">
              {[["7:00", "Doors open"], ["8:30", "Session with Sandeep ji"], ["6:30", "Class, online"]].map(([t, l]) => (
                <li key={t} className="flex gap-2.5">
                  <span className="tnum w-9 shrink-0 font-semibold text-amber-deep">{t}</span>
                  <span className="leading-snug text-ink">{l}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Frame i={7}  className="left-[7%] top-[16%] w-[116px]" dl="1.5s" />
          <Frame i={16} className="left-[13%] top-[56%] w-[116px] hidden xl:block [@media(max-height:840px)]:hidden" dl="3.4s" />
        </div>
      </div>

      {/* the message */}
      <div className="relative z-10 mx-auto w-full max-w-[660px] px-5 text-center sm:px-8 xl:max-w-[820px]">
        <p className="eyebrow">A whole day built for</p>

        <h1 className="poster mt-6 text-[clamp(2.7rem,min(9.4vw,17vh),8.5rem)] lowercase text-forest">
          <span className="sr-only">
            Happiness Centre — a whole day built for weight loss, weight gain, diabetes,
            thyroid, PCOS, stress, and you
          </span>
          {/*
            The box is sized by the longest word and never wraps, so typing
            changes nothing in the layout below it. Without this the whole page
            jitters on every keystroke.
          */}
          <span aria-hidden className="relative mx-auto block w-fit">
            <span className="invisible whitespace-nowrap">weight loss.</span>
            <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
              {text}
              <span className="caret ml-0.5 inline-block w-[0.055em] bg-amber"
                    style={{ height: "0.78em" }} />
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-[50ch] text-[1.02rem] leading-relaxed text-muted">
          Not a diet chart — a whole day. Meals, movement, a morning ritual and our own
          products, built around your body and repeated until it stops feeling like effort.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/free-day" className="rounded-full bg-forest px-8 py-4 text-[0.92rem] font-semibold text-white transition-colors hover:bg-bark">
            Start your free day →
          </Link>
          <Link href="/consultation" className="rounded-full border border-hairline bg-canvas px-8 py-4 text-[0.92rem] font-semibold text-forest transition-colors hover:bg-mist">
            Book a consultation
          </Link>
        </div>
        <p className="tnum mt-5 text-[0.76rem] text-muted">
          One day · no payment · no obligation
        </p>

        <div className="mt-10 flex justify-center gap-2.5 lg:hidden">
          {[2, 7, 16].map((i) => {
            const st = STORIES[i];
            const v = st.views[0];
            return (
              <span key={st.id} className="block w-[30%] max-w-[150px] overflow-hidden rounded-xl border border-hairline bg-canvas p-1 shadow-[0_8px_24px_rgba(31,77,17,.10)]">
                <span className="relative grid aspect-square grid-cols-2 overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.before.src} alt="" loading="eager" className="h-full w-full object-cover object-top" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.after.src} alt="" loading="eager" className="h-full w-full object-cover object-top" />
                  <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-amber" />
                </span>
                <span className="tnum block pt-1.5 text-center text-[0.68rem] font-bold text-forest">
                  {kgLabel(st.kg)}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      {/* concerns we work with */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-7 pt-[clamp(3.5rem,11vh,7rem)] sm:px-8">
        <div className="frosted flex flex-wrap items-center justify-center gap-x-2 gap-y-2 rounded-2xl border border-hairline px-5 py-5">
          <span className="mr-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted">We work with</span>
          {CONCERNS.map((c) => (
            <span key={c} className="rounded-full border border-hairline px-3.5 py-1.5 text-[0.76rem] font-medium text-forest">
              {c}
            </span>
          ))}
          <span className="tnum ml-auto hidden text-[0.68rem] uppercase tracking-[0.16em] text-muted lg:inline">
            {STORY_COUNT} stories · {TOTAL_KG_LOST} kg
          </span>
        </div>
      </div>
    </section>
  );
}
