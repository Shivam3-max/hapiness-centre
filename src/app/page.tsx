import Opening from "@/components/motion/Opening";
import Statements from "@/components/motion/Statements";
import Routine from "@/components/motion/Routine";
import ProofBeat from "@/components/motion/ProofBeat";
import FoundersBeat from "@/components/motion/FoundersBeat";
import FreeDayClose from "@/components/motion/FreeDayClose";

const WHY = [
  { text: "The plan always starts on", accent: "Monday." },
  { text: "You eat well all day. Then", accent: "6 pm happens." },
  { text: "The reports came back.", accent: "Nobody explained them." },
  { text: "You’ve lost it before. It", accent: "came back." },
  { text: "You are tired of", accent: "starting over." },
];

export default function Home() {
  return (
    <>
      <Opening />
      <Statements eyebrow="Why people come" lines={WHY} />
      <Routine />
      <ProofBeat />
      <FoundersBeat />
      <FreeDayClose />
    </>
  );
}
