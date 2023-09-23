import { useState } from "react";
import Intro from "./Intro";
import { Step } from "./step.enum";
import { Header } from "./Header";

export default function MainPage() {
  const [step, setStep] = useState<Step>(Step.Intro);

  return (
    <div className="bg-background w-screen h-screen">
      <div className="bg-white h-full mx-auto max-w-3xl">
        <Header step={step} />
        <Intro />
      </div>
    </div>
  );
}
