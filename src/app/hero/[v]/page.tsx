import { notFound } from "next/navigation";
import HeroPoster from "@/components/heroes/HeroPoster";
import HeroEditorial from "@/components/heroes/HeroEditorial";
import HeroThrough from "@/components/heroes/HeroThrough";
import HeroConstellation from "@/components/heroes/HeroConstellation";

const MAP: Record<string, { C: React.ComponentType; name: string }> = {
  a: { C: HeroPoster, name: "A · Poster" },
  b: { C: HeroEditorial, name: "B · Editorial" },
  c: { C: HeroThrough, name: "C · Through" },
  d: { C: HeroConstellation, name: "D · Constellation" },
};

export function generateStaticParams() {
  return Object.keys(MAP).map((v) => ({ v }));
}

export default async function HeroOption({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  const hit = MAP[v];
  if (!hit) notFound();
  const { C } = hit;
  return <C />;
}
