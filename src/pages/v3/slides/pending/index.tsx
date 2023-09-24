import { Wrapper } from "pages/v3/sections/Wrapper";
import { Step } from "pages/v3/step.enum";
import { useEffect } from "react";
import { useV3Selection, useV3Step } from "states/v3-global.states";

export const Pending = () => {
  const [txInfo] = useV3Selection(Step.Pending);
  const [, setStep] = useV3Step();
  useEffect(() => {
    if (txInfo) {
      setStep(Step.Done);
    }
  }, [txInfo]);
  return <Wrapper>Transaction is pending...!</Wrapper>;
};
