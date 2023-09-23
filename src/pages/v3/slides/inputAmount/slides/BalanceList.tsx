import { TOKENS } from "config/tokens.config";
import { Token } from "interfaces/token.interface";
import { TokenIcon } from "pages/common/coinIcons/TokenIcon";
import { IoChevronForward } from "react-icons/io5";

interface BalanceListProps {
  chainId: number;
  selectToken: (t: Token) => void;
}
export const BalanceList = ({ chainId, selectToken }: BalanceListProps) => {
  // TODO: MOCK TOKENS
  const tokens = TOKENS[chainId].slice(0, 3);
  const amounts = [17, 32.4, 102];
  return (
    <div className="flex flex-col">
      {tokens.map((t, i) => (
        <div
          key={i}
          onClick={() => selectToken(t)}
          className="flex items-center justify-between gap-4 py-4 px-4 hover:bg-neutral-100"
        >
          <TokenIcon token={t} size="xl" />
          <div className="flex flex-1 justify-between">
            <p className="text-black">{t.symbol}</p>
            <div>
              <p>Your Balance : {amounts[i]}</p>
            </div>
          </div>

          <IoChevronForward size={22} className="-mr-1" />
        </div>
      ))}
    </div>
  );
};
