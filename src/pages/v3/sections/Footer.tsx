import { Step } from "pages/v3/step.enum";
import { useV3Step } from "states/v3-global.states";
import titles from "./titles";

interface FooterProps {
  onNext?: () => void;
}

export const Footer = ({ onNext }: FooterProps) => {
  const [step, setStep, canNext] = useV3Step();
  const prevTitle = titles[step - 1];
  const nextTitle = titles[step + 1];
  const toPrev = () => setStep((prev) => prev - 1);
  const toNext =
    onNext ?? (() => setStep((prev) => (prev === Step.Done ? 0 : prev + 1)));
  return (
    <div className="flex gap-4">
      {step > 0 && step < Step.Done && (
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
          : step === Step.Done
          ? "Go back to start"
          : "Go!"}
      </button>
    </div>
  );
};
