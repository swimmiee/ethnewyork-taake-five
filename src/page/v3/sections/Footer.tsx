import { Step } from "page/v3/step.enum";
import { useState } from "react";
import { useV3Step } from "states/v3-global.states";
import titles from "./titles";

export const Footer = () => {
  const [step, setStep, canNext] = useV3Step();
  const prevTitle = titles[step - 1];
  const nextTitle = titles[step + 1];
  const toPrev = () => setStep((prev) => prev - 1);
  const toNext = () => setStep((prev) => (prev === Step.Last ? 0 : prev + 1));
  return (
    <div className="flex gap-4 pb-4 px-4">
      {step > 0 && step < Step.Last && (
        <button onClick={toPrev} className="flex-1 btn btn-secondary">
          Prev: {prevTitle}
        </button>
      )}
      <button
        disabled={!canNext}
        onClick={toNext}
        className={"flex-1 btn btn-primary-active"}
      >
        {step < Step.Input
          ? `Next: ${nextTitle}`
          : step === Step.Last
          ? "Go back to start"
          : "Go!"}
      </button>
    </div>
  );
};
