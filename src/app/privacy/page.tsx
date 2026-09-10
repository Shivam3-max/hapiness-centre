import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy", description: "How Happiness Centre handles the information you give us." };

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy"
      updated="10 September 2026"
      sections={[
        { h: "What we collect", p: ["When you book a free day or request a consultation we collect your name, your mobile number, the goal you selected and anything you choose to write in the notes field.", "If you become a member we also hold health information you share with us — body composition readings, conditions, medication and reports you bring in."] },
        { h: "Why we hold it", p: ["To arrange your visit, write your plan, and check in with you during a programme. That is the whole list."] },
        { h: "Who sees it", p: ["The founders and the coaches working on your programme. We do not sell your information, and we do not share it with advertisers.", "We will share it with your treating doctor only if you ask us to."] },
        { h: "Photographs", p: ["We photograph members against the same wall to track progress. Those photographs are for your record by default.", "We publish a photograph only where the member has agreed to it, and you can withdraw that agreement at any time and we will remove it."] },
        { h: "How long we keep it", p: ["For as long as you are a member, and for a reasonable period afterwards so that we can pick up where we left off if you return. Ask us to delete it and we will."] },
        { h: "Your choices", p: ["You can ask to see what we hold, correct it, or have it deleted. Contact us at the centre and we will deal with it."] },
      ]}
    />
  );
}
