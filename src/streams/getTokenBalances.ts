import { AddressZero } from "@biconomy/common";
import { Interface } from "ethers/lib/utils";
import { Multicall2__factory } from "typechain";
import { getProvider } from "utils/getProvider";

export const getTokenBalances = async (
  owner: string,
  chain: { chainId: number; rpcUrls: string[]; multicallAddress: string },
  tokenAddresses: string[]
): Promise<bigint[]> => {
  const erc20Itf = new Interface([
    "function balanceOf(address owner) view returns (uint256)",
  ]);

  const multicall = Multicall2__factory.connect(
    chain.multicallAddress,
    getProvider(chain)
  );

  const callDatas = tokenAddresses.map((token) =>
    token === AddressZero // native token인 경우
      ? {
          target: chain.multicallAddress,
          callData: multicall.interface.encodeFunctionData("getEthBalance", [
            owner,
          ]),
        }
      : {
          target: token,
          callData: erc20Itf.encodeFunctionData("balanceOf", [owner]),
        }
  );

  const { returnData } = await multicall.callStatic.aggregate(callDatas);
  return returnData.map((res) => BigInt(res));
};
