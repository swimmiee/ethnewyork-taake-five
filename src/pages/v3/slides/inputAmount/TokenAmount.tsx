import { findToken } from "config";
import { TokenIcon } from "pages/common/coinIcons/TokenIcon";
import { IoClose } from "react-icons/io5";

interface TokenAmountProps {
  tokenId: string;
  amount: string;
  del: () => void;
}
export const TokenAmount = ({ tokenId, amount, del }: TokenAmountProps) => {
  const token = findToken(tokenId)!;

  return (
    <div className="border-[1.5px] border-neutral-500 rounded-xl flex items-center justify-between p-3">
      <TokenIcon token={token} size="xl" />
      <p className="flex-1 text-center">
        {amount} {token.symbol}
      </p>
      <IoClose onClick={del} />
    </div>
  );
};
