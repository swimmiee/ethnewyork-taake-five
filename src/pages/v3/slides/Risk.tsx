import { useV3Selection } from "states/v3-global.states";
import { Wrapper } from "../sections/Wrapper";
import { Step } from "../step.enum";
import { cn } from "utils/cn";

const Risk = () => {
  const [selectedRisk, selectRisk] = useV3Selection(Step.Risk);

  const RiskButton = ({ risk, text }: { risk: number; text: string }) => (
    <button
      onClick={() => selectRisk(risk)}
      className={cn(
        "h-20 btn",
        risk === selectedRisk ? "btn-primary-active" : "btn-primary"
      )}
    >
      {text}
    </button>
  );
  return (
    <Wrapper>
      <p className="text-3xl">
        How much <b className="font-medium">RISK</b>
      </p>
      <p className="text-3xl">are you willing to take?</p>

      <div className="flex-1 flex justify-center flex-col gap-6">
        <RiskButton risk={0} text={"Low Risk, Low Return"} />
        <RiskButton risk={1} text={"Medium Risk, Medium Return"} />
        <RiskButton risk={2} text={"High Risk, High Return"} />
        <RiskButton risk={3} text={"No matter what, I want just look around"} />
        <button className="h-20 btn btn-primary">
          I don't know, tell me more
        </button>
      </div>
    </Wrapper>
  );
};

export default Risk;
