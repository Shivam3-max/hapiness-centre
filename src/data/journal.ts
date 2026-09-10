/** PLACEHOLDER editorial. Replace with the centre's own writing before launch. */
export type Post = {
  slug: string; title: string; category: string; readMins: number; date: string;
  excerpt: string; body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "the-five-thirty-slump",
    title: "The 5:30 slump is where most diets actually die",
    category: "Behaviour", readMins: 4, date: "2026-08-18",
    excerpt: "Not the first week. Not the wedding. The gap between finishing work and eating dinner, repeated every single evening.",
    body: [
      "Ask somebody why their last attempt failed and they will tell you about a wedding, a holiday, or a bad week at work. Ask them what a Tuesday looked like and you get closer to the truth.",
      "Between about five and seven in the evening, three things arrive together: blood sugar is low, willpower has been spent on other people all day, and dinner is still an hour away. That combination is not a character flaw. It is a predictable, physiological gap, and it is the single most common point of collapse we see.",
      "The fix is unglamorous. Eat enough protein at lunch that the gap is smaller. Put something you have already decided on into that window, before you are hungry enough to negotiate with yourself. Walk for ten minutes at the moment you would normally open the fridge.",
      "None of this is clever. It works because it removes the decision from a moment when you are least equipped to make it.",
    ],
  },
  {
    slug: "ten-minutes-after-eating",
    title: "Ten minutes of walking after a meal beats an hour in the evening",
    category: "Movement", readMins: 3, date: "2026-08-04",
    excerpt: "For blood sugar specifically, when you walk matters more than how long you walk.",
    body: [
      "Most people save exercise for the end of the day, when the day has already been survived. For general fitness that is fine. For blood sugar it is the wrong time.",
      "A short walk taken shortly after eating gives working muscle somewhere to put the glucose that has just arrived, blunting the spike rather than mopping it up hours later. Ten to fifteen minutes is enough to matter.",
      "This is why post-meal walking is written into every plan at the centre, and why it is non-negotiable in Sugar Balance. It is the cheapest intervention we have, it requires no equipment, and it fits into a working day.",
      "If you can only do one walk, do it after your largest meal.",
    ],
  },
  {
    slug: "protein-on-a-vegetarian-plate",
    title: "The vegetarian plate problem nobody wants to talk about",
    category: "Nutrition", readMins: 5, date: "2026-07-21",
    excerpt: "Most Indian vegetarian diets are not short of food. They are short of protein — and that shortage shows up as hunger, not as weakness.",
    body: [
      "A typical home-cooked vegetarian day in this part of the country is generous with carbohydrate and thin on protein. That is not a criticism of the food. It is simply what dal, roti, sabzi and rice add up to.",
      "The consequence is rarely dramatic. It shows up as being hungry ninety minutes after a full meal, as muscle disappearing alongside fat when you lose weight, and as a body that looks softer at a lower number on the scale.",
      "Fixing it does not mean abandoning the way your family eats. It means front-loading protein at breakfast, being deliberate with dairy, pulses and paneer through the day, and topping up where the plate genuinely cannot get there.",
      "We would rather add one thing to your existing plate than replace the whole plate with something you will not eat in March.",
    ],
  },
  {
    slug: "why-we-photograph-everybody",
    title: "Why we photograph everybody against the same wall",
    category: "The centre", readMins: 3, date: "2026-07-02",
    excerpt: "Same wall, same light, same distance. Not for marketing — for evidence.",
    body: [
      "The scale is a poor witness. It moves with water, with salt, with sleep, with the time of the month. Somebody can do everything right for a fortnight and see nothing.",
      "A photograph taken in the same place, in the same light, from the same distance, is much harder to argue with. When a member is convinced nothing is happening, we put two of them side by side and the argument usually ends.",
      "That is why the wall exists, and why we ask at the start rather than once somebody has already succeeded. The pictures on our transformations page are the same pictures we take for everyone.",
      "Nobody is obliged to let us show theirs.",
    ],
  },
  {
    slug: "festival-season-without-starting-over",
    title: "Getting through festival season without starting over in January",
    category: "Behaviour", readMins: 4, date: "2026-06-16",
    excerpt: "Six weeks of sweets, weddings and other people's kitchens. Planned for, it costs you nothing.",
    body: [
      "Between Diwali and the end of wedding season there is a stretch of weeks where normal rules do not apply. Most plans pretend this stretch does not exist, which is why most plans end there.",
      "We write it in instead. Members get a festival plan before the season starts, not an apology afterwards.",
      "The principles are simple. Do not arrive hungry. Eat the thing you actually want rather than four things you do not. Keep the morning ritual fixed even when the evening is chaos — it is the anchor that makes the next day recoverable.",
      "The goal for those six weeks is not progress. It is holding position, so that January is a continuation rather than a fresh start.",
    ],
  },
  {
    slug: "what-body-composition-tells-you",
    title: "What a body composition reading tells you that a scale can’t",
    category: "Nutrition", readMins: 4, date: "2026-05-28",
    excerpt: "Two people at 74 kg can be in completely different health. The scale cannot tell them apart.",
    body: [
      "Weight is one number describing several things at once: fat, muscle, bone, water and whatever you last ate. Adding them together and reporting a single figure loses almost everything useful.",
      "A composition reading separates them. It is how we can tell whether a slow fortnight on the scale was actually a good fortnight — fat down, muscle held — or a genuinely stalled one.",
      "It also changes the target. For most members over fifty, holding muscle matters more than reaching a particular weight, and that only becomes visible once the number is split apart.",
      "You get this reading on your free day, before anyone talks to you about a programme.",
    ],
  },
];

export const CATEGORIES = [...new Set(POSTS.map((p) => p.category))];
