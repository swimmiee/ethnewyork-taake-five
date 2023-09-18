import { useStep } from "states/step.atom";
import { Wrapper } from "../sections/Wrapper";
import { Step } from "../step.enum";

const Intro = () => {
  const [, setStep] = useStep();
  return (
    <Wrapper className="justify-center">
      <p className="text-3xl">Interactive DeFi investing service for </p>
      <p className="text-3xl font-medium mb-8">YOU</p>
      <button onClick={() => setStep(Step.Risk)} className="btn btn-primary-active">
        Start!
      </button>
    </Wrapper>
  );
};

export default Intro;
