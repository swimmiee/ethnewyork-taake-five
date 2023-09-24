export interface BaseToken {
  chainId: number;
  address: string;
  symbol: string;
  decimals: number;
}

export interface BaseExchangeStep {
  fromToken: BaseToken;
  toToken: BaseToken;
  type: "Swap" | "Bridge" | "Wrap" | "Unwrap";
  project: string;
}

export interface SwapPath {
  address: string;
  fee: number;
  from: string;
  to: string;
}

export const swapCategories = ["UniswapV3", "Curve"] as const;
export type SwapCategory = (typeof swapCategories)[number];

export interface SwapPathCandidate {
  project: string;
  category: SwapCategory;
  path: SwapPath[];
  meta: {
    positionManager: string;
    quoter: string;
    swapRouter: string;
    tickLens: string;
  };
}

export interface SwapStepDto extends BaseExchangeStep {
  type: "Swap" | "Wrap" | "Unwrap";
  candidates: SwapPathCandidate[];
}
