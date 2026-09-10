/**
 * Dev-only harness: renders one section at the top of an otherwise empty page
 * so it can be screenshotted. Delete before launch (see README → Before launch).
 */
import { notFound } from "next/navigation";
import Concerns from "@/components/home/Concerns";
import Pillars from "@/components/home/Pillars";
import ADay from "@/components/home/ADay";
import ProofStrip from "@/components/home/ProofStrip";
import ProgramPicker from "@/components/home/ProgramPicker";
import Founders from "@/components/home/Founders";
import Voices from "@/components/home/Voices";
import FreeDayBand from "@/components/home/FreeDayBand";

const MAP: Record<string, React.ComponentType> = {
  concerns: Concerns,
  pillars: Pillars,
  day: ADay,
  proof: ProofStrip,
  programs: ProgramPicker,
  founders: Founders,
  voices: Voices,
  freeday: FreeDayBand,
};

export function generateStaticParams() {
  return Object.keys(MAP).map((id) => ({ id }));
}

export default async function Preview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const C = MAP[id];
  if (!C) notFound();
  return (
    <div className="pt-[76px]">
      <C />
    </div>
  );
}
