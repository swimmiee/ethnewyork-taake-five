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
    <div className="flex items-center justify-between p-4">
      <TokenIcon token={token} size="lg" />
      <p className="flex-1 text-center">
        {amount} {token.symbol}
      </p>
      <IoClose onClick={del} />
    </div>
  );
};
