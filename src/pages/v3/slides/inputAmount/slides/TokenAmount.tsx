import { findToken } from "config";
import { Token } from "interfaces/token.interface";
import { TokenIcon } from "pages/common/coinIcons/TokenIcon";
import { IoChevronForward } from "react-icons/io5";
import { useBalance, useTokenBalancesInChain } from "states/balances.state";
import { cn } from "utils/cn";
import { useNumberInput } from "utils/hooks/useNumberInput";

interface TokenAmountProps {
  tokenId: string;
  unselect: () => void;
  addInput: (token: Token, amount: string) => void;
}
export const TokenAmount = ({
  tokenId,
  unselect,
  addInput,
}: TokenAmountProps) => {
  const token = findToken(tokenId)!;
  const balance = useBalance(token);
  const [value, onChangeValue, setValue] = useNumberInput("");
  return (
    <div className="p-4 flex flex-col">
      <div className="flex items-center gap-2">
        <TokenIcon token={token} size="lg" />
        <p className="flex-1 text-lg ">{token.symbol}</p>
        <div
          className="flex-center text-neutral-400 cursor-pointer"
          onClick={unselect}
        >
          <p>Select other token</p>
          <IoChevronForward className="-mb-0.5 -mr-0.5" />
        </div>
      </div>

      <p className="mt-2 text-neutral-400">Balance: {balance}</p>
      <div className="flex gap-3 mt-2">
        {[25, 50, 75, 100].map((percent) => {
          const val = String((+balance * percent) / 100);
          return (
            <button
              key={percent}
              onClick={() => setValue(val)}
              className={cn(
                "flex-1 btn-sm",
                val === value ? "btn-primary-active" : "btn-primary"
              )}
            >
              {percent === 100 ? "MAX" : `${percent}%`}
            </button>
          );
        })}
      </div>
      <input
        type="number"
        className="outline-none w-full h-12 border-[1.5px] border-neutral-300 rounded-md mt-3 px-4 text-lg"
        placeholder="0.0"
        value={value}
        onChange={onChangeValue}
      />

      <button
        onClick={() => addInput(token, value)}
        className="btn btn-primary mt-3"
      >
        OK
      </button>
    </div>
  );
};
