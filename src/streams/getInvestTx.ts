import { api } from "api";
import { AddressZero } from "@biconomy/common";
import { encodeTokenId } from "config/tokenIdEncoder";
import { BigNumber, constants } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { Invest } from "interfaces/invest.interface";
import { SwapStepDto } from "interfaces/swap-path.dto";
import { Token } from "interfaces/token.interface";
import { ERC20__factory } from "typechain";
import { v3Swap } from "./v3SwapTx";
import { predictSwapV3 } from "./predictV3Swap";
import { findChain, findToken, findTokens } from "config";
import { v3Zap } from "./v3Zap";
import { approveTx } from "./approveTx";

export interface InputAsset {
  token: Token;
  amount: string;
}

export interface TxDescription {
  data: string;
  to: string;
  value?: BigNumber;
  description: string[];
}

export const getInvestTx = async (
  inputAssets: InputAsset[],
  invest: Invest,
  tickLower: number,
  tickUpper: number,
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

  const inputTokens = findTokens(chainId, invest.inputAssets, false);
  const includesWETH = inputTokens.map((t) => t.type === "wETH");
  const finalInput = inputAssets.reduce((acc, { token, amount }) => {
    if (
      invest.inputAssets.includes(token.address) ||
      (includesWETH && token.address === AddressZero)
    ) {
      acc[token.address] = (acc[token.address] ?? constants.Zero).add(
        parseUnits(amount, token.decimals)
      );
    }
    return acc;
  }, {} as Record<string, BigNumber>);

  steps.forEach((step, i) => {
    const { amount, amountIn, amountOut } = swapAmounts[i];
    if (step.fromToken.address !== AddressZero) {
      txs.push(
        approveTx(step.fromToken, step.candidates[0].meta.swapRouter, amountIn)
      );
    }
    // push swap
    const { data, value } = v3Swap(amountIn, to, step);
    txs.push({
      data,
      value,
      to: step.candidates[0].meta.swapRouter,
      description: [
        `Swap ${amount} ${step.fromToken.symbol} to ${formatUnits(
          amountOut,
          step.toToken.decimals
        )} ${step.toToken.symbol}`,
      ],
    });
    finalInput[step.toToken.address] = (
      finalInput[step.toToken.address] ?? constants.Zero
    ).add(amountOut.mul(999).div(1000));
  });

  const investInput = Object.entries(finalInput).map(([address, amount]) => {
    const token = findToken(encodeTokenId({ chainId, address }))!;
    return {
      token,
      amount: formatUnits(amount, token.decimals),
    };
  });

  const zap = await v3Zap(invest, investInput, tickLower, tickUpper, to);

  investInput.forEach((input) => {
    if (input.token.address !== AddressZero) {
      txs.push(
        approveTx(
          input.token,
          invest.meta.toaster,
          parseUnits(input.amount, input.token.decimals)
        )
      );
    }
  });

  const [tIn, tOut] = findTokens(
    invest.chainId,
    [zap.process.tokenIn, zap.process.tokenOut],
    false
  );
  txs.push({
    data: zap.tx.data,
    to: invest.meta.toaster,
    value: zap.tx.value,
    description: [
      `Swap ${formatUnits(zap.process.swapAmountIn, tIn.decimals)} ${
        tIn.symbol
      } to ${+(+formatUnits(zap.process.swapAmountOut, tOut.decimals)).toFixed(
        6
      )} ${tOut.symbol}`,
      `Invest Uniswap V3`,
    ],
  });

  return txs;
};
