import HeroConstellation from "@/components/heroes/HeroConstellation";
import Concerns from "@/components/home/Concerns";
import Pillars from "@/components/home/Pillars";
import ADay from "@/components/home/ADay";
import ProofStrip from "@/components/home/ProofStrip";
import ProgramPicker from "@/components/home/ProgramPicker";
import Founders from "@/components/home/Founders";
import Voices from "@/components/home/Voices";
import FreeDayBand from "@/components/home/FreeDayBand";

export default function Home() {
  return (
    <>
      <HeroConstellation />
      <Concerns />
      <Pillars />
      <ADay />
      <ProofStrip />
      <ProgramPicker />
      <Founders />
      <Voices />
      <FreeDayBand />
    </>
  );
}
