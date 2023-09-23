import { ethers } from "ethers";

export const getProvider = ({ rpcUrls }: { rpcUrls: string[] }) => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrls[0]);
  return provider;
};
