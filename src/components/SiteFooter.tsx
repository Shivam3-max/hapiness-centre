import Link from "next/link";
import { NAV, NAV_MORE, NAV_LEGAL, SITE } from "@/lib/site";

export default function SiteFooter() {
  const a = SITE.address;
  return (
    <footer className="mt-24 bg-forest text-white/85">
      <div className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_.8fr_.8fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-mark-reverse.png" alt="" width={56} height={57} className="h-14 w-auto" />
            <p className="display mt-8 max-w-[14ch] text-[clamp(1.9rem,3vw,2.6rem)] lowercase leading-[0.92] text-white">
              You don’t get a diet. You get <span className="text-amber">a day.</span>
            </p>
          </div>

          <div>
            <p className="eyebrow text-amber">Visit us</p>
            <address className="mt-4 not-italic leading-relaxed">
              {a.line1}
              <br />
              {a.line2}
              <br />
              {a.locality}, {a.region} {a.postal}
            </address>
            {SITE.phone ? (
              <a href={`tel:${SITE.phone}`} className="mt-4 inline-block underline underline-offset-4">
                {SITE.phone}
              </a>
            ) : null}

            <p className="eyebrow mt-9 text-lime">Hours</p>
            <dl className="mt-4 space-y-1.5">
              {[["Opens", SITE.hours.opens],
                ["Morning session", SITE.hours.morningSession],
                ["Evening class", SITE.hours.eveningClass]].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="w-[8.5rem] shrink-0 text-white/50">{k}</dt>
                  <dd className="tnum">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="eyebrow text-amber">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {[...NAV, { href: "/free-day", label: "Free Day 1" }, { href: "/consultation", label: "Book a consultation" }].map((n) => (
                <li key={n.href}><Link href={n.href} className="transition-colors hover:text-amber">{n.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-amber">More</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_MORE.map((n) => (
                <li key={n.href}><Link href={n.href} className="transition-colors hover:text-amber">{n.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/15 pt-7 text-[0.72rem] leading-relaxed text-white/55">
          <p className="max-w-[80ch]">
            Happiness Centre offers nutrition, lifestyle and wellness guidance. Our
            programmes support the management of conditions such as diabetes, thyroid
            disorders and PCOS alongside your doctor’s care — they do not replace medical
            treatment, and nothing here is a claim to cure. Please consult your physician
            before changing medication.
          </p>
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} Happiness Centre, {SITE.city}.</span>
            {NAV_LEGAL.map((n) => (
              <Link key={n.href} href={n.href} className="underline underline-offset-4 hover:text-amber">{n.label}</Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
