import { findChain, findTokens } from "config";
import { Invest } from "interfaces/invest.interface";
import { DoubleTokensIcon } from "page/common/coinIcons/DoubleTokenIcon";
import { Step } from "page/v3/step.enum";
import { useV3Selection } from "states/v3-global.states";
import { cn } from "utils/cn";
import { compactFormat } from "utils/formatter";

export const InvestItem = ({
  id,
  chainId,
  inputAssets,
  apr,
  tvlUSD,
  volumeUSD7D,
  meta,
}: Invest) => {
  const tokens = findTokens(chainId, inputAssets, true);
  const chain = findChain(chainId)!;
  const [investSelection, setInvestSelection] = useV3Selection(Step.Investment);
  const isSelected = investSelection === id;
  const select = () => setInvestSelection(id);

  return (
    <div
      onClick={select}
      className={cn(
        "flex justify-between items-center rounded-lg border-[1.5px] pr-4 py-1 gap-4",
        isSelected ? "border-black bg-primary" : "hover:bg-neutral-100 border-neutral-200"
      )}
    >
      <div className="flex flex-col items-center w-32 pt-2">
        <DoubleTokensIcon tokens={tokens} />
        <p className="mt-1">{tokens.map((t) => t.symbol).join("+")}</p>
        <p className="-mt-1 text-sm">{chain.name}</p>
      </div>
      <div className="flex-1 flex flex-col gap-px">
        <div className="flex items-center gap-4">
          <p className="flex-1 text-neutral-500 font-light">APR</p>
          <p className="flex-1 text-right">{apr.toFixed(2)}%</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="flex-1 text-neutral-500 font-light">TVL</p>
          <p className="flex-1 text-right">$ {compactFormat(tvlUSD)}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="flex-1 text-neutral-500 font-light">Volume (7D)</p>
          <p className="flex-1 text-right">$ {compactFormat(volumeUSD7D)}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="flex-1 text-neutral-500 font-light">Fee Tier</p>
          <p className="flex-1 text-right">{meta.feeTier / 1e4}%</p>
        </div>
      </div>
    </div>
  );
};
