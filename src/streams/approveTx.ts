import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { ERC20__factory } from "typechain";

export const approveTx = (
  token: { address: string; decimals: number; symbol: string },
  spender: string,
  amount: BigNumber
) => {
  const erc20Itf = ERC20__factory.createInterface();

  return {
    data: erc20Itf.encodeFunctionData("approve", [spender, amount]),
    to: token.address,
    description: [
      `Approve ${formatUnits(amount, token.decimals)} ${token.symbol}`,
    ],
  };
};
