import { cn } from "utils/cn";
import { CHAINS } from "config/chains.config";
import { Wrapper } from "pages/v3/sections/Wrapper";
import { ChainButton } from "../investment/ChainButton";
import { useV3Selection } from "states/v3-global.states";
import { Step } from "pages/v3/step.enum";

export const ChainSelection = () => {
  const [selectedChainId, setChainId] = useV3Selection(Step.Chain);

  return (
    <Wrapper>
      <p className="text-3xl mb-4">Which CHAIN do you prefer?</p>
      <button
        className={cn(
          "my-4 btn",
          selectedChainId === null ? "btn-primary-active" : "btn-primary"
        )}
        onClick={() => setChainId(null)}
      >
        Any Chain
      </button>
      <div className="flex flex-col gap-4">
        {CHAINS.map((chain) => (
          <ChainButton
            key={chain.chainId}
            chain={chain}
            selectedChainId={selectedChainId as number | null}
            setChainId={setChainId}
          />
        ))}
      </div>
    </Wrapper>
  );
};
