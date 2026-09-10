import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { Shell } from "@/components/Section";
import Button from "@/components/Button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit us",
  description: "Happiness Centre, Shop No. 10, Lower Ground, EL Spazia Market, Nagla, Zirakpur, Punjab 140603.",
};

const MAPS = "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("EL Spazia Market, Nagla, Zirakpur, Punjab 140603");

export default function ContactPage() {
  const a = SITE.address;
  return (
    <>
      <PageHero eyebrow="Visit us" title="Lower ground, EL Spazia."
                lead="Come at seven if you want the quiet part of the morning. Come at half eight if you want the room full." />
      <Section className="!pt-0">
        <Shell>
          <div className="grid gap-px bg-hairline lg:grid-cols-3">
            <div className="bg-canvas p-8 lg:p-10">
              <p className="eyebrow">Address</p>
              <address className="mt-5 not-italic text-[1.05rem] leading-relaxed text-ink">
                {a.line1}<br />{a.line2}<br />{a.locality}<br />{a.region} {a.postal}
              </address>
              <a href={MAPS} target="_blank" rel="noreferrer"
                 className="mt-6 inline-block text-[0.84rem] font-semibold text-forest underline underline-offset-4 hover:text-lime">
                Open in Maps ↗
              </a>
            </div>

            <div className="bg-canvas p-8 lg:p-10">
              <p className="eyebrow">Hours</p>
              <dl className="mt-5 space-y-3">
                {[["Opens", SITE.hours.opens],
                  ["Morning session", SITE.hours.morningSession],
                  ["Evening class", SITE.hours.eveningClass],
                  ["Days", SITE.hours.days ?? "—"]].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-muted">{k}</dt>
                    <dd className="tnum mt-1 text-[1rem] text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-canvas p-8 lg:p-10">
              <p className="eyebrow">Reach us</p>
              <dl className="mt-5 space-y-3">
                {[["Phone", SITE.phone], ["WhatsApp", SITE.whatsapp], ["Instagram", SITE.instagram]].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-muted">{k}</dt>
                    <dd className="mt-1 text-[1rem] text-ink">{v ?? "—"}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3">
                <Button href="/free-day">Book your free day</Button>
                <Button href="/consultation" variant="ghost">Request a consultation</Button>
              </div>
            </div>
          </div>
        </Shell>
      </Section>
    </>
  );
}
