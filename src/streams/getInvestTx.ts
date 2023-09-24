import { api } from "api";
import { AddressZero } from "@biconomy/common";
import { encodeTokenId } from "config/tokenIdEncoder";
import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { Invest } from "interfaces/invest.interface";
import { SwapStepDto } from "interfaces/swap-path.dto";
import { Token } from "interfaces/token.interface";
import { ERC20__factory } from "typechain";
import { v3Swap } from "./v3SwapTx";
import { predictSwapV3 } from "./predictV3Swap";
import { findChain } from "config";

export interface InputAsset {
  token: Token;
  amount: string;
}

export interface TxDescription {
  data: string;
  to: string;
  value?: BigNumber;
  description: string;
}

export const getInvestTx = async (
  inputAssets: InputAsset[],
  invest: Invest,
  to: string
) => {
  const chainId = invest.chainId;
  const chain = findChain(chainId)!;
  if (inputAssets.some((asset) => asset.token.chainId !== chainId)) {
    throw new Error(
      "ChainId of input asset is not matched with chainId of invest"
    );
  }

  const steps = await api
    .get<{ steps: SwapStepDto[] }>("v1/exchanges", {
      params: {
        from: inputAssets.map(({ token }) => encodeTokenId(token)).join(","),
        to: invest.inputAssets
          .map((address) => `${chainId}_${address}`)
          .join(","),
      },
    })
    .then((res) => res.data.steps.filter((step) => step.type === "Swap"));

  const erc20Itf = ERC20__factory.createInterface();

  const txs: TxDescription[] = [];

  const swapAmounts = await Promise.all(
    steps.map(async (step) => {
      const amount = inputAssets.find(
        ({ token }) => token.address === step.fromToken.address
      )?.amount;
      if (!amount) throw Error("ln59");
      const amountIn = parseUnits(amount, step.fromToken.decimals);
      const amountOut = await predictSwapV3(
        chain,
        step.candidates[0],
        amountIn
      );
      return { amount, amountIn, amountOut };
    })
  );

  steps.forEach((step, i) => {
    const { amount, amountIn, amountOut } = swapAmounts[i];
    if (step.fromToken.address !== AddressZero) {
      txs.push({
        data: erc20Itf.encodeFunctionData("approve", [
          // invest.meta.toaster,
          step.candidates[0].meta.swapRouter,
          amountIn,
        ]),
        to: step.fromToken.address,
        description: `Approve ${amount} ${step.fromToken.symbol}`,
      });
    }
    // push swap
    const { data, value } = v3Swap(amountIn, to, step);
    txs.push({
      data,
      value,
      to: step.candidates[0].meta.swapRouter,
      description: `Swap ${amount} ${step.fromToken.symbol} to ${formatUnits(
        amountOut,
        step.toToken.decimals
      )} ${step.toToken.symbol}`,
    });
  });

  return txs;
};
