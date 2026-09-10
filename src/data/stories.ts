import raw from "./transformations.json";
import type { Goal } from "./content";

export type Shot = { src: string; w: number; h: number; lqip: string };
export type View = {
  view: "front" | "side";
  before: Shot;
  after: Shot;
  full: { before: string; after: string };
};
export type Story = {
  id: string;
  slug: string;
  goal: Goal;
  goalLabel: string;
  kg: number;          // negative = lost, positive = gained
  months: number;
  ageBracket: string;
  views: View[];
};

export const STORIES = raw.stories as Story[];
export const STORIES_ARE_PLACEHOLDER = raw.placeholder as boolean;

/** Every view as its own tile — the wall and the grid both want the flat list. */
export const TILES = STORIES.flatMap((s) => s.views.map((v) => ({ story: s, view: v })));

export const TOTAL_KG_LOST = STORIES.reduce((n, s) => n + (s.kg < 0 ? -s.kg : 0), 0);
export const STORY_COUNT = STORIES.length;

export const countByGoal = (goal: Goal) => STORIES.filter((s) => s.goal === goal).length;

export const kgLabel = (kg: number) => (kg < 0 ? `−${Math.abs(kg)} kg` : `+${kg} kg`);
