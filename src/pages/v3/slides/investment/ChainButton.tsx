import { Chain } from "interfaces/chain.interface";
import { ChainIcon } from "pages/common/coinIcons/ChainIcon";
import { cn } from "utils/cn";

interface ChainButtonProps {
  chain: Chain;
  selectedChainId: number | null;
  setChainId: (chainId: number) => void;
}
export const ChainButton = ({
  chain,
  selectedChainId,
  setChainId,
}: ChainButtonProps) => {
  return (
    <button
      className={cn(
        "btn flex-center",
        chain.chainId === selectedChainId ? "btn-primary-active" : "btn-primary"
      )}
      onClick={() => setChainId(chain.chainId)}
    >
      <div className="flex-1 flex justify-end">
        <ChainIcon size="xl" chain={chain} />
      </div>
      <div className="flex-1 flex-center">
        <p>{chain.name}</p>
      </div>
      <div className="flex-1 flex-center" />
    </button>
  );
};
