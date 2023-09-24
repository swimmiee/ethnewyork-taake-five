import { Wrapper } from "pages/v3/sections/Wrapper";
import { InvestItemList } from "./InvestItemList";
import { useV3Selection } from "states/v3-global.states";
import { Step } from "pages/v3/step.enum";

const Investment = () => {
  // null => no matter
  const [selectedChainId] = useV3Selection(Step.Chain);

  return (
    <Wrapper>
      {/* Investments */}
      <p className="text-3xl mb-4">Select Uniswap V3 Pool to Invest</p>
      <InvestItemList chainId={selectedChainId as number | null} />
    </Wrapper>
  );
};
export default Investment;
