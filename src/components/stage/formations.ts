/** The five shapes the particle field moves between, in scroll order. */
export const FORMATIONS = ["orb", "scatter", "ring", "arc", "disc"] as const;
export type Formation = (typeof FORMATIONS)[number];

const TAU = Math.PI * 2;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/** Deterministic pseudo-random so the field is identical on every load. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function buildFormation(name: Formation, count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const rand = rng(name.length * 7919 + count);

  for (let i = 0; i < count; i++) {
    const t = i / count;
    let x = 0, y = 0, z = 0;

    switch (name) {
      // dawn — a slow breathing sphere
      case "orb": {
        const yy = 1 - t * 2;
        const r = Math.sqrt(Math.max(0, 1 - yy * yy));
        const th = GOLDEN * i;
        const rad = 3.75 + rand() * 0.3;
        x = Math.cos(th) * r * rad;
        y = yy * rad;
        z = Math.sin(th) * r * rad;
        break;
      }
      // unsettled — wide, agitated, no centre
      case "scatter": {
        const g = () => (rand() + rand() + rand() - 1.5) * 1.6;
        x = g() * 4.2;
        y = g() * 2.8;
        z = g() * 1.8;
        break;
      }
      // the day — a clock ring, tilted
      case "ring": {
        const th = t * TAU + rand() * 0.05;
        const rad = 4.0 + (rand() - 0.5) * 0.42;
        x = Math.cos(th) * rad;
        y = Math.sin(th) * rad * 0.62;
        z = Math.sin(th) * rad * 0.42;
        break;
      }
      // change — a rising sweep
      case "arc": {
        const u = t * 2 - 1;
        x = u * 4.8 + (rand() - 0.5) * 0.34;
        y = -1.5 + (1 - u * u) * 2.5 + (rand() - 0.5) * 0.42;
        z = (rand() - 0.5) * 1.1;
        break;
      }
      // rest — one calm disc
      case "disc": {
        const rad = Math.sqrt(rand()) * 3.5;
        const th = rand() * TAU;
        x = Math.cos(th) * rad;
        y = Math.sin(th) * rad * 0.9;
        z = (rand() - 0.5) * 0.35;
        break;
      }
    }
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return out;
}
