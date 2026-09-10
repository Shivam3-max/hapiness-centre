/**
 * PLACEHOLDER CONTENT.
 * Everything in this file is written to be replaced with what the centre
 * actually offers. See README.md → "Before launch".
 */
export const PLACEHOLDER = true;

export type Goal =
  | "weight-loss" | "weight-gain" | "diabetes" | "thyroid-pcos" | "senior-wellness";

export const GOALS: { key: Goal; label: string }[] = [
  { key: "weight-loss", label: "Weight loss" },
  { key: "weight-gain", label: "Weight gain" },
  { key: "diabetes", label: "Diabetes care" },
  { key: "thyroid-pcos", label: "Thyroid & PCOS" },
  { key: "senior-wellness", label: "Senior wellness" },
];

export type Program = {
  slug: string; name: string; days: number; goal: Goal;
  tagline: string; who: string; includes: string[]; rhythm: string[]; note?: string;
};

export const PROGRAMS: Program[] = [
  {
    slug: "reset-30", name: "Reset 30", days: 30, goal: "weight-loss",
    tagline: "One month to break the pattern you’re stuck in.",
    who: "Anyone who has tried three diets this year and finished none of them.",
    includes: ["Body composition reading at start and finish", "A rotating 30-day meal plan cooked from your own kitchen", "Daily 20-minute movement set", "The morning ritual", "Starter product kit", "WhatsApp check-in every day"],
    rhythm: ["Week 1 — we change nothing but breakfast", "Week 2 — lunch and the afternoon slump", "Week 3 — movement doubles", "Week 4 — you cook the plan without looking at it"],
  },
  {
    slug: "transform-90", name: "Transform 90", days: 90, goal: "weight-loss",
    tagline: "The flagship. Ninety days, four reviews, one new default.",
    who: "People carrying 10 kg or more who want it gone and want it to stay gone.",
    includes: ["Fortnightly one-to-one review", "Three plan rewrites as your body changes", "Full movement progression", "The morning ritual", "Complete product kit, replenished monthly", "Festival and travel plans built in"],
    rhythm: ["Days 1–21 — the reset", "Days 22–55 — the build", "Days 56–80 — the push", "Days 81–90 — the handover, so it holds without us"],
  },
  {
    slug: "sugar-balance", name: "Sugar Balance", days: 120, goal: "diabetes",
    tagline: "Steadier numbers, alongside your doctor — never instead of them.",
    who: "Anyone managing type 2 diabetes or pre-diabetes who wants food to do more of the work.",
    includes: ["Plate structure built around your medication timing", "Low-glycaemic meal rotation", "Post-meal walking protocol", "Monthly review with your latest reports", "Product kit", "Daily check-in"],
    rhythm: ["Month 1 — stabilise the day", "Month 2 — rebuild the plate", "Month 3 — add load", "Month 4 — hold it without counting"],
    note: "We work with your treating physician. We never advise stopping or changing medication.",
  },
  {
    slug: "hormone-reset", name: "Hormone Reset", days: 90, goal: "thyroid-pcos",
    tagline: "For bodies where the usual advice stopped working.",
    who: "Women managing thyroid disorders or PCOS who have been told to ‘just eat less’.",
    includes: ["Cycle-aware meal planning", "Anti-inflammatory rotation", "Strength-first movement", "Sleep and stress protocol", "Product kit", "Fortnightly review"],
    rhythm: ["Weeks 1–4 — inflammation down", "Weeks 5–8 — strength up", "Weeks 9–12 — the rhythm holds"],
    note: "Supportive care alongside your endocrinologist or gynaecologist.",
  },
  {
    slug: "build-up", name: "Build Up", days: 90, goal: "weight-gain",
    tagline: "Gaining well is harder than losing. We take it just as seriously.",
    who: "Underweight adults who eat all day and still can’t put anything on.",
    includes: ["Calorie-dense plans that don’t wreck digestion", "Gut repair phase", "Progressive strength work", "Product kit", "Fortnightly review"],
    rhythm: ["Weeks 1–3 — fix absorption first", "Weeks 4–9 — surplus and strength", "Weeks 10–12 — consolidate"],
  },
  {
    slug: "sixty-plus", name: "Sixty Plus", days: 60, goal: "senior-wellness",
    tagline: "Lighter, steadier, and still doing your own shopping at eighty.",
    who: "Members over sixty who care more about knees, energy and blood pressure than the scale.",
    includes: ["Joint-friendly movement, chair options throughout", "Soft, familiar, easily chewed food", "Blood pressure and sugar tracking", "Product kit", "Weekly call, family welcome to join"],
    rhythm: ["Weeks 1–3 — steady the day", "Weeks 4–6 — mobility", "Weeks 7–8 — independence"],
  },
];

export type Pillar = { n: string; name: string; line: string; body: string; detail: string[] };

export const PILLARS: Pillar[] = [
  { n: "01", name: "Diet", line: "Your kitchen, your food, measured properly.",
    body: "No imported ingredients, no meal you have to explain to your family. We build the plan out of what already cooks in your house, then get the quantities right.",
    detail: ["Written for your kitchen, not a template", "Rewritten as your body changes", "Festival, travel and eating-out plans included"] },
  { n: "02", name: "Movement", line: "Twenty minutes that you will actually do.",
    body: "Not a gym membership you abandon in March. A short daily set that fits between waking up and leaving the house, progressing as you get stronger.",
    detail: ["Twenty minutes, at home, no equipment to start", "Progression every fortnight", "Chair and joint-friendly variants for every exercise"] },
  { n: "03", name: "Morning Ritual", line: "The first ninety minutes decide the day.",
    body: "Wake, water, movement, first meal — in that order, at roughly the same time. It is the least glamorous part of the package and the one that changes the most.",
    detail: ["A fixed wake and first-meal window", "Hydration before caffeine", "Ten minutes of light before the first screen"] },
  { n: "04", name: "Products", line: "A small kit, included, not upsold.",
    body: "Our own supplements sit inside the package price. They fill the gaps a home kitchen genuinely struggles with — nothing more, and nothing you have to keep buying separately.",
    detail: ["Included in the programme fee", "Replenished monthly on longer programmes", "Every ingredient listed on the pack"] },
];

export type Hour = { time: string; title: string; body: string };

/**
 * The centre's real daily rhythm. Timings confirmed by the centre; the longer
 * descriptions marked TODO are still to be supplied.
 */
export const DAY: Hour[] = [
  { time: "7:00", title: "Doors open", body: "The centre opens. Early members arrive, weigh in and settle before the session starts." },
  { time: "8:30", title: "The morning session", body: "Exercises led by Mr. Sandeep Kumar and the coaching team. Everybody moves together, at their own level, with chair variants for anyone who needs them." },
  { time: "—", title: "The morning drink", body: "TODO — confirm what the morning drink is and what it does." },
  { time: "—", title: "Class", body: "TODO — confirm what the morning class covers." },
  { time: "10:30", title: "Morning session ends", body: "The floor clears and one-to-one reviews and consultations run from here." },
  { time: "18:30", title: "Evening class, online", body: "The evening class runs online, so members who work — or who live too far to come twice — never miss the day entirely." },
];

export type Product = { slug: string; name: string; kind: string; line: string; body: string; use: string };

export const PRODUCTS: Product[] = [
  { slug: "morning-mix", name: "Morning Mix", kind: "Powder · 300 g", line: "The first thing you take, before anything else.", body: "A light morning blend taken with warm water to start the day’s hydration and settle the stomach before the first meal.", use: "One scoop in warm water on waking." },
  { slug: "fibre-blend", name: "Fibre Blend", kind: "Powder · 250 g", line: "For the part of the plate most Indian kitchens miss.", body: "Added soluble fibre to support digestion and keep you full through the gap between meals.", use: "One scoop with water, once daily." },
  { slug: "protein-scoop", name: "Protein Scoop", kind: "Powder · 500 g", line: "Because vegetarian plates rarely get there on their own.", body: "A daily protein top-up sized for people who are not athletes and do not want to eat six eggs.", use: "One scoop after the movement set." },
  { slug: "metabolism-tea", name: "Metabolism Tea", kind: "Loose leaf · 100 g", line: "Replaces the fourth cup of sugared chai.", body: "A herbal infusion for the afternoon, made to be drunk without sugar and still taste like something.", use: "One cup mid-afternoon." },
  { slug: "omega-caps", name: "Omega Capsules", kind: "60 capsules", line: "Joints, and the quiet stuff.", body: "A daily omega supplement supporting joint comfort and general wellbeing.", use: "One capsule with lunch." },
  { slug: "night-calm", name: "Night Calm", kind: "Powder · 200 g", line: "Sleep is half the programme.", body: "A caffeine-free evening drink to help wind the day down at a consistent hour.", use: "One scoop in warm milk or water before bed." },
];

export const COACHES = [
  { name: "Mr. Sandeep Kumar", role: "Founder · Lifestyle & Movement", bio: "Sandeep leads the movement and morning-ritual side of every programme, and runs the centre’s community sessions. He is the reason the twenty-minute set is twenty minutes and not an hour." },
  { name: "Mrs. Shweta", role: "Founder · Nutrition", bio: "Shweta writes the plans. Every plan at Happiness Centre is built around the food a member already cooks, and rewritten as their body changes through the programme." },
];

export const REVIEWS = [
  { quote: "The plan was made from what I already cook at home. That was the first time a diet made sense to me.", who: "Member, Zirakpur", program: "Transform 90" },
  { quote: "I came for the weight. I stayed because my afternoons stopped being unbearable.", who: "Member, Dhakoli", program: "Reset 30" },
  { quote: "My reports improved and my doctor asked what I had changed. I said breakfast.", who: "Member, Zirakpur", program: "Sugar Balance" },
  { quote: "The free day is what convinced me. I ate the actual food before I paid anything.", who: "Member, Peer Muchalla", program: "Reset 30" },
  { quote: "At sixty-eight I can climb to the terrace without stopping halfway. That is the whole review.", who: "Member, Zirakpur", program: "Sixty Plus" },
  { quote: "They never once made me feel bad about how I looked. That mattered more than the plan.", who: "Member, Baltana", program: "Hormone Reset" },
];

export const FAQS = [
  { q: "What exactly is free on the first day?", a: "A full day of the programme — one prepared meal from your plan, the morning ritual, the movement set, a body composition reading, and a coach on WhatsApp for the day. Nothing is charged and you are not asked to commit at the end of it." },
  { q: "Do I have to buy the products separately?", a: "No. The product kit is inside the programme fee, and on longer programmes it is replenished every month at no extra cost." },
  { q: "Will I have to eat food my family doesn’t eat?", a: "No. Plans are built from your own kitchen. Most members cook one pot for the household and simply change their own portions and order of eating." },
  { q: "I have diabetes and I’m on medication. Can I join?", a: "Yes, and you should keep taking your medication exactly as prescribed. We work alongside your doctor, plan around your dosing times, and never advise changing medication ourselves." },
  { q: "I’m underweight. Is this only for weight loss?", a: "No. Build Up is a full programme for gaining weight properly, which is usually harder than losing it and starts with fixing digestion rather than eating more." },
  { q: "How much time does the movement take?", a: "Twenty minutes a day to begin with, at home, with nothing to buy. It progresses every fortnight, but it never becomes a gym programme unless you want it to." },
  { q: "What if I travel, or there’s a wedding?", a: "Travel and festival plans are written into every programme. They are the weeks people usually quit, so we plan them in advance rather than apologise for them afterwards." },
  { q: "Can someone over seventy join?", a: "Yes. Sixty Plus is built for it — chair variants for every exercise, softer food, and family members welcome on the weekly call." },
  { q: "Is this a gym?", a: "No. It is a wellness club and a dietitian practice with a community around it. There is no equipment to learn and no one watching you exercise." },
  { q: "Where are you?", a: "Shop No. 10, Lower Ground, EL Spazia Market, Nagla, Zirakpur, Punjab 140603." },
];
