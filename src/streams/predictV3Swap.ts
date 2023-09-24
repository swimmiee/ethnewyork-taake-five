import { BigNumber } from "ethers";
import { Chain } from "interfaces/chain.interface";
import { SwapPathCandidate } from "interfaces/swap-path.dto";
import { QuoterV2__factory } from "typechain";
import { getProvider } from "utils/getProvider";

export const predictSwapV3 = async (
  chain: Chain,
  { path, meta }: SwapPathCandidate,
  amountIn: BigNumber
) => {
  const { quoter } = meta;
  const provider = getProvider(chain);

  const Q = QuoterV2__factory.connect(quoter, provider);
  const quoted =
    path.length > 1
      ? Q.callStatic.quoteExactInput(
          [
            path[0].from,
            ...path.map((p) => {
              const encodedFee = p.fee.toString(16).padStart(6, "0");
              return `${encodedFee}${p.to.slice(2)}`;
            }),
          ]
            .join("")
            .toLowerCase(),
          amountIn
        )
      : Q.callStatic.quoteExactInputSingle({
          tokenIn: path[0].from,
          tokenOut: path[0].to,
          fee: path[0].fee,
          amountIn,
          sqrtPriceLimitX96: 0,
        });
  return quoted.then((res) => res.amountOut);
};
