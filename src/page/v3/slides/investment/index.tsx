import { Wrapper } from "page/v3/sections/Wrapper";
import { useV3Selection } from "states/v3-global.states";
import { Step } from "../../step.enum";
import { useState } from "react";
import { cn } from "utils/cn";
import { CHAINS } from "config/chains.config";
import { ChainButton } from "./ChainButton";
import { InvestItemList } from "./InvestItemList";

const Investment = () => {
  // null => no matter
  const [selectedChainId, setChainId] = useState<number | null>(null);

  return (
    <Wrapper>
      <p className="text-2xl">Which CHAIN do you prefer?</p>
      <button
        className={cn(
          "my-2 btn",
          selectedChainId === null ? "btn-primary-active" : "btn-primary"
        )}
        onClick={() => setChainId(null)}
      >
        Any Chain
      </button>
      <div className="grid grid-cols-2 gap-2">
        {CHAINS.map((chain) => (
          <ChainButton
            key={chain.chainId}
            chain={chain}
            selectedChainId={selectedChainId}
            setChainId={setChainId}
          />
        ))}
      </div>

      {/* Investments */}
      <p className="text-2xl my-4">Select Uniswap V3 Pool</p>
      <InvestItemList chainId={selectedChainId} />
    </Wrapper>
  );
};
export default Investment;
