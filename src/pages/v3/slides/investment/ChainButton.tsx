import { Chain } from "interfaces/chain.interface";
import { cn } from "utils/cn";

interface ChainButtonProps {
  chain: Chain;
  selectedChainId: number | null;
  setChainId: (chainId: number) => void;
}
export const ChainButton = ({ chain, selectedChainId, setChainId }: ChainButtonProps) => {
  return (
    <button
      className={cn(
        "btn",
        chain.chainId === selectedChainId ? "btn-primary-active" : "btn-primary"
      )}
      onClick={() => setChainId(chain.chainId)}
    >
      <p className="text-base">{chain.name}</p>
    </button>
  );
};
