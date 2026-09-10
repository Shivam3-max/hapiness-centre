/**
 * Canonical origin. Vercel sets VERCEL_PROJECT_PRODUCTION_URL on every deploy,
 * so previews and production both resolve correctly before a domain is attached.
 * Override with NEXT_PUBLIC_SITE_URL once the real domain is live.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://happinesscentre.in");

export const SITE = {
  name: "Happiness Centre",
  city: "Zirakpur",
  address: {
    line1: "Shop No. 10, Lower Ground",
    line2: "EL Spazia Market",
    locality: "Nagla, Zirakpur",
    region: "Punjab",
    postal: "140603",
  },
  // TODO: awaiting real values from the centre
  phone: null as string | null,
  whatsapp: null as string | null,
  instagram: null as string | null,

  hours: {
    opens: "7:00 am",
    morningSession: "8:30 – 10:30 am",
    eveningClass: "6:30 pm, online",
    days: null as string | null,   // TODO: which days of the week
  },
} as const;

export const NAV = [
  { href: "/transformations", label: "Transformations" },
  { href: "/programs", label: "Programmes" },
  { href: "/method", label: "The Method" },
  { href: "/community", label: "The Club" },
] as const;

export const NAV_MORE = [
  { href: "/products", label: "The Kit" },
  { href: "/coaches", label: "Coaches" },
  { href: "/tools", label: "Free Tools" },
  { href: "/journal", label: "Journal" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "Questions" },
  { href: "/contact", label: "Visit Us" },
] as const;

export const NAV_LEGAL = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;
