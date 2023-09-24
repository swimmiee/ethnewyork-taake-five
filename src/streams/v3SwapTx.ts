import { AddressZero } from "@biconomy/common";
import { BigNumber } from "ethers";
import { SwapPathCandidate, SwapStepDto } from "interfaces/swap-path.dto";
import { SwapRouterV2__factory } from "typechain";

export const v3Swap = (
  amountIn: BigNumber,
  to: string,
  { candidates, fromToken, toToken }: SwapStepDto
) => {
  const { path, meta } = candidates[0];
  const swapRouterItf = SwapRouterV2__factory.createInterface();

  const executes: string[] = [];
  const value =
    fromToken.address === AddressZero ? amountIn : BigNumber.from(0);
  const toNative = toToken.address === AddressZero;

  if (path.length === 1) {
    executes.push(
      swapRouterItf.encodeFunctionData("exactInputSingle", [
        {
          tokenIn: path[0].from,
          tokenOut: path[0].to,
          fee: path[0].fee,
          recipient: toNative ? meta.swapRouter : to,
          amountIn,
          amountOutMinimum: 1,
          sqrtPriceLimitX96: 0,
        },
      ])
    );
  } else {
    const encodedPath = [
      path[0].from,
      ...path.map(
        (p) => `${p.fee.toString(16).padStart(6, "0")}${p.to.slice(2)}`
      ),
    ]
      .join("")
      .toLowerCase();

    executes.push(
      swapRouterItf.encodeFunctionData("exactInput", [
        {
          recipient: to,
          path: encodedPath,
          amountIn,
          amountOutMinimum: 1, // TODO: SLIPPAGE
        },
      ])
    );

  }

  if (toNative) {
    executes.push(
      swapRouterItf.encodeFunctionData("unwrapWETH9(uint256,address)", [0, to])
    );
  }

  const data = swapRouterItf.encodeFunctionData("multicall(bytes[])", [
    executes,
  ]);

  return {
    value,
    data,
  };
};
