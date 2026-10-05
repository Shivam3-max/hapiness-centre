export type Beat = {
  time: string;
  title: string;
  line: string;
  caption: string;
  /** drop a real photograph path in here and the placeholder disappears */
  src?: string;
};

/** The day we sell. Six beats, a handful of words each — photographs carry it. */
export const ROUTINE: Beat[] = [
  { time: "7:30",  title: "The doors open.",        line: "The room is already warm. Somebody has made the first drink.", caption: "the doors, Zirakpur" },
  { time: "8:00",  title: "The class begins.",      line: "Everybody moves at the same time. That is most of the trick.", caption: "the morning class" },
  { time: "8:30",  title: "Twenty minutes.",        line: "No equipment on day one. A chair variant for every movement.", caption: "the movement set" },
  { time: "9:30",  title: "The morning drink.",     line: "Made here, taken here, before anybody goes home.",             caption: "the morning drink" },
  { time: "11:00", title: "Your consultation.",     line: "One body, one plan, written from the food you already cook.",  caption: "the consultation room" },
  { time: "6:30",  title: "Evening class, online.", line: "A working day never costs you the whole programme.",           caption: "the evening class" },
];
