import { getAddress } from "ethers/lib/utils";
import { decodeTokenId } from "./tokenIdEncoder";
import { TOKENS } from "./tokens.config";
import { CHAINS } from "./chains.config";
import { constants } from "ethers";

export const addrEqual = (a: string, b: string) =>
  getAddress(a) === getAddress(b);

export const findChain = (chainId: number) =>
  CHAINS.find((chain) => chain.chainId === chainId);

export const getTokens = (chainId: number) => TOKENS[chainId];

export const findToken = (encodedTokenId: string) => {
  const { chainId, address } = decodeTokenId(encodedTokenId);
  return getTokens(chainId).find((token) => addrEqual(token.address, address));
};

export const findTokens = (
  chainId: number,
  tokenAddrs: string[],
  autoUnwrap: boolean
) => {
  const tokensInChain = getTokens(chainId);
  return tokenAddrs.map((address) => {
    const t = tokensInChain.find((token) => addrEqual(token.address, address))!;
    return autoUnwrap && t?.type === "wETH"
      ? tokensInChain.find((token) =>
          addrEqual(token.address, constants.AddressZero)
        )!
      : t;
  });
};
