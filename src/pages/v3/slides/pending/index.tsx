import { Wrapper } from "pages/v3/sections/Wrapper";
import { Step } from "pages/v3/step.enum";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useV3Selection, useV3Step } from "states/v3-global.states";

export const Pending = () => {
  const [txInfo] = useV3Selection(Step.Pending);
  const [, setStep] = useV3Step();
  useEffect(() => {
    if (txInfo) {
      setStep(Step.Done);
    }
  }, [txInfo]);
  return (
    <Wrapper>
      <div className="flex-1 flex-col flex-center py-8">
        <FaSpinner className="animate-spin" size={42} />
        <p className="text-xl mt-4">Transaction is pending...!</p>
      </div>
    </Wrapper>
  );
};
