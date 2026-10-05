import Opening from "@/components/motion/Opening";
import Statements from "@/components/motion/Statements";
import Routine from "@/components/motion/Routine";
import ProofBeat from "@/components/motion/ProofBeat";
import FoundersBeat from "@/components/motion/FoundersBeat";
import FreeDayClose from "@/components/motion/FreeDayClose";
import { PROBLEMS } from "@/data/copy";

export default function Home() {
  return (
    <>
      <Opening />
      <Statements eyebrow={PROBLEMS.eyebrow} lines={PROBLEMS.lines} />
      <Routine />
      <ProofBeat />
      <FoundersBeat />
      <FreeDayClose />
    </>
  );
}
