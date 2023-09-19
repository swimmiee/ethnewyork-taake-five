import { getAddress } from "ethers/lib/utils";
import { decodeTokenId } from "./tokenIdEncoder";
import { TOKENS } from "./tokens.config";
import { CHAINS } from "./chains.config";

export const addrEqual = (a: string, b: string) =>
  getAddress(a) === getAddress(b);

export const findChain = (chainId: number) =>
  CHAINS.find((chain) => chain.chainId === chainId);

export const getTokens = (chainId: number) => TOKENS[chainId];

export const findToken = (encodedTokenId: string) => {
  const { chainId, address } = decodeTokenId(encodedTokenId);
  return getTokens(chainId).find((token) => addrEqual(token.address, address));
};
