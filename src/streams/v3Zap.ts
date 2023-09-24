import { findChain, findTokens } from "config";
import { BigNumber } from "ethers";
import { Invest } from "interfaces/invest.interface";
import { InputAsset } from "./getInvestTx";
import { AddressZero } from "@biconomy/common";
import { parseUnits } from "ethers/lib/utils";
import { SwapRouterV2__factory, UniswapV3Toaster__factory } from "typechain";
import { getProvider } from "utils/getProvider";
import { IApproveAndCall } from "typechain/v3/SwapRouterV2";

const ZERO = BigNumber.from(0);
export const getProcessData = async (
  invest: Invest,
  inputAssets: InputAsset[],
  tickLower: number,
  tickUpper: number
) => {
  const chain = findChain(invest.chainId)!;
  const provider = getProvider(chain);
  // already sorted by alphabetical order
  const [token0, token1] = findTokens(
    invest.chainId,
    invest.inputAssets,
    false
  );

  const nativeToken = inputAssets.find((t) => t.token.address === AddressZero);
  const nativeInputAmount = nativeToken
    ? parseUnits(nativeToken.amount, nativeToken.token.decimals)
    : ZERO;
  const amount0 = parseUnits(
    inputAssets.find((a) => a.token.address === token0.address)?.amount || "0",
    token0.decimals
  );
  const amount1 = parseUnits(
    inputAssets.find((a) => a.token.address === token1.address)?.amount || "0",
    token1.decimals
  );

  const toaster = UniswapV3Toaster__factory.connect(
    invest.meta.toaster,
    provider
  );

  const [swapAmountIn, swapAmountOut, isSwap0] =
    await toaster.getSwapAmountForAddLiquidity({
      pool: invest.address,
      tickUpper,
      tickLower,
      amount0: amount0.add(token0.type === "wETH" ? nativeInputAmount : ZERO),
      amount1: amount1.add(token1.type === "wETH" ? nativeInputAmount : ZERO),
      height: 96,
    });

  const [tokenIn, tokenOut, amountIn, amountOut] = isSwap0
    ? [token0, token1, amount0, amount1]
    : [token1, token0, amount1, amount0];

  return {
    tokenIn: tokenIn.address,
    tokenOut: tokenOut.address,
    feeTier: invest.meta.feeTier,
    amountIn,
    amountOut,
    nativeInputAmount,
    swapAmountIn,
    swapAmountOut,
    isTokenInNative: tokenIn.type === "wETH",
  };
};

export const v3Zap = async (
  invest: Invest,
  inputAssets: InputAsset[],
  tickLower: number,
  tickUpper: number,
  to: string
) => {
  const {
    tokenIn,
    tokenOut,
    feeTier,
    nativeInputAmount,
    amountIn,
    amountOut,
    swapAmountIn,
    isTokenInNative,
  } = await getProcessData(invest, inputAssets, tickLower, tickUpper);
  const toasterItf = UniswapV3Toaster__factory.createInterface();
  const swapRouterItf = SwapRouterV2__factory.createInterface();

  const [token0, token1] =
    tokenIn.toLowerCase() < tokenOut.toLowerCase()
      ? [tokenIn, tokenOut]
      : [tokenOut, tokenIn];

  const mintParams: IApproveAndCall.MintParamsStruct = {
    token0,
    token1,
    fee: feeTier,
    tickLower,
    tickUpper,
    amount0Min: 0,
    amount1Min: 0,
    recipient: to,
  };

  const multicallData: string[] = [];
  if (nativeInputAmount.gt(ZERO)) {
    multicallData.push(
      toasterItf.encodeFunctionData("wrapETH", [nativeInputAmount])
    );
  }

  if (amountIn.gt(ZERO)) {
    multicallData.push(
      toasterItf.encodeFunctionData("pull", [tokenIn, amountIn])
    );
  }
  if (amountOut.gt(ZERO)) {
    multicallData.push(
      toasterItf.encodeFunctionData("pull", [tokenOut, amountOut])
    );
  }

  multicallData.push(
    toasterItf.encodeFunctionData("exactInputSingleBySelf", [
      {
        tokenIn,
        tokenOut,
        fee: feeTier,
        amountIn: swapAmountIn,
      },
    ])
  );

  multicallData.push(
    swapRouterItf.encodeFunctionData("approveZeroThenMax", [tokenIn]),
    swapRouterItf.encodeFunctionData("approveZeroThenMax", [tokenOut]),
    toasterItf.encodeFunctionData("mint", [mintParams])
  );

  // // sweep garbage tokens
  if (nativeInputAmount.gt(ZERO)) {
    multicallData.push(
      toasterItf.encodeFunctionData("unwrapWETH9(uint256)", [ZERO]),
      toasterItf.encodeFunctionData("sweepToken(address,uint256)", [
        isTokenInNative ? tokenOut : tokenIn,
        ZERO,
      ])
    );
  } else {
    multicallData.push(
      toasterItf.encodeFunctionData("sweepToken(address,uint256)", [
        tokenIn,
        ZERO,
      ]),
      toasterItf.encodeFunctionData("sweepToken(address,uint256)", [
        tokenOut,
        ZERO,
      ])
    );
  }

  return {
    data: toasterItf.encodeFunctionData("multicall(bytes[])", [multicallData]),
    value: nativeInputAmount,
  };
};
