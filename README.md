# Happiness Centre — website

Wellness club, dietitian practice and community in Zirakpur, Punjab.
Next.js 16 · React 19 · Tailwind v4 · GSAP · Lenis.

```bash
npm run dev -- -p 3710
```

Append `?still=1` to any URL to freeze animations and render final states — used
for screenshots and visual diffing. `/preview/<section>` renders a single home
section on its own (dev harness).

---

## ⚠️ Before launch

Everything below is placeholder and **must be replaced**.

### Critical — real people are involved
- [ ] **`src/data/transformations.json`** — `kg`, `months`, `goal` and `ageBracket`
      are **generated demo values** attached to photographs of **real, identifiable
      members**. Replace every one with the centre's own records. The file carries
      `"placeholder": true`; flip it to `false` once done.
- [x] Consent confirmed by the centre for every person whose photograph appears (10 Sep 2026).
- [ ] `IMG_0451` was dropped from the set — the "Happiness centre zirakpur"
      watermark is printed across the subject and cannot be removed. Re-shoot or
      supply a clean original to bring the count back to 30.

### Content
- [ ] `src/lib/site.ts` — phone, WhatsApp, Instagram, and which **days** the centre opens.
- [ ] `src/data/content.ts` — `PROGRAMS` (names, lengths, what's included),
      `PRODUCTS` (the real kit), `REVIEWS` (real quotes with permission), `FAQS`.
- [ ] `src/data/content.ts` → `DAY` — two entries are marked `TODO` (the morning
      drink, and what the morning class covers).
- [ ] `src/app/community/page.tsx` — four `TODO` cards (group chat, challenges,
      festival sessions, family days).
- [ ] `src/data/journal.ts` — replace with the centre's own writing.
- [ ] Photographs of Mr. Sandeep Kumar and Mrs. Shweta (`/coaches` currently
      falls back to the logo mark), and product photography.

### Engineering
- [ ] **Forms do not submit anywhere.** `StepForm` collects state and shows a
      confirmation. Wire `/free-day` and `/consultation` to a real endpoint.
- [ ] Delete `src/app/preview/` (dev-only; already disallowed in `robots.ts`).
- [ ] Set the real domain in `layout.tsx` (`metadataBase`), `sitemap.ts`, `robots.ts`.
- [ ] Have `/privacy` and `/terms` reviewed by a qualified professional.

---

## Health claims

Copy is deliberately written as **management and support alongside medical care**,
never cure. Products are described as nutritional supplements, not medicines. The
footer carries a standing disclaimer. Keep it that way.

---

## Brand

Colours are sampled from the logo file (olive/yellow-green, not emerald) — see
`BRAND.md`. Only **Forest `#1F4D11`** clears contrast for body text on white;
Leaf and Lime are large-display and accent only.

`public/brand/` holds `logo-mark.svg` and `logo-full.svg`, traced from the raster
source by `scripts/trace_logo.py` (marching squares → Douglas–Peucker → Béziers),
plus PNG fallbacks and favicons.

## Images

`scripts/` regenerates nothing automatically. Source photographs live in `_raw/`;
processed output is committed at `public/transformations/{full,card,thumb}/`
as `<id>_{before,after}.webp`. Frames throughout assume a **1:2** source ratio.
