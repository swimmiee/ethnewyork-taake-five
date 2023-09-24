import { Bundler } from "@biconomy/bundler";
import { DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import { BiconomyPaymaster } from "@biconomy/paymaster";

const BICONOMY_SUPPORTED = {
  // zkevm, base, arbitrum, polygon
  chains: [1101, 8453, 42161, 137],
  1101: {
    apiKey: import.meta.env.VITE_BICONOMY_ZKEVM_API_KEY,
  },
  8453: {
    apiKey: import.meta.env.VITE_BICONOMY_BASE_API_KEY,
  },
  42161: {
    apiKey: import.meta.env.VITE_BICONOMY_ARBITRUM_API_KEY,
  },
  137: {
    apiKey: import.meta.env.VITE_BICONOMY_POLYGON_API_KEY,
  },
};

export const getBiconomyAPI = (chainId: number) => {
  if (!BICONOMY_SUPPORTED.chains.includes(chainId))
    throw new Error(`Chain ${chainId} is not supported by Biconomy`);

  // @ts-ignore
  const apiKey = BICONOMY_SUPPORTED[chainId].apiKey;
  const bundler = new Bundler({
    bundlerUrl: `https://bundler.biconomy.io/api/v2/${chainId}/cJPK7B3ru.dd7f7861-190d-45ic-af80-6877f74b8f44`,
    chainId,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  });

  const paymaster = new BiconomyPaymaster({
    paymasterUrl: `https://paymaster.biconomy.io/api/v1/${chainId}/${apiKey}`,
    strictMode: false,
  });

  return { bundler, paymaster };
};
