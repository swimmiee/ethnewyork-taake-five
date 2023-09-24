import { findToken } from "config";
import { encodeTokenId } from "config/tokenIdEncoder";
import { Token } from "interfaces/token.interface";
import { TokenIcon } from "pages/common/coinIcons/TokenIcon";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoChevronForward } from "react-icons/io5";
import { useTokenBalancesInChain } from "states/balances.state";

interface BalanceListProps {
  chainId: number;
  selectToken: (t: Token) => void;
}
export const BalanceList = ({ chainId, selectToken }: BalanceListProps) => {
  const tokenBalances = useTokenBalancesInChain(chainId);

  if (!tokenBalances)
    return (
      <div className="flex-col flex-center py-8">
        <FaSpinner className="animate-spin" size={42} />
        <p className="text-xl mt-4">Loading...</p>
      </div>
    );
  return (
    <div className="flex flex-col">
      {tokenBalances.length > 0 ? (
        tokenBalances.map(({ address, amount }, i) => {
          const token = findToken(encodeTokenId({ chainId, address }))!;
          return (
            <div
              key={i}
              onClick={() => selectToken(token)}
              className="flex items-center justify-between gap-4 py-4 px-4 hover:bg-neutral-100"
            >
              <TokenIcon token={token} size="xl" />
              <div className="flex flex-1 justify-between">
                <p className="text-black">{token.symbol}</p>
                <div>
                  <p>Your Balance : {(+amount).toFixed(6)}</p>
                </div>
              </div>
              <IoChevronForward size={22} className="-mr-1" />
            </div>
          );
        })
      ) : (
        <div>
          <div className="flex-col flex-center py-8">
            <AiOutlineCloseCircle size={48} />
            <p className="text-xl mt-8">No token balances</p>
          </div>
        </div>
      )}
    </div>
  );
};
