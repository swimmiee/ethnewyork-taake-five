import {
  atom,
  selector,
  selectorFamily,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { accountAtom } from "./account.state";
import { CHAINS } from "config/chains.config";
import { TOKENS } from "config/tokens.config";
import { getTokenBalances } from "streams/getTokenBalances";
import { formatUnits } from "ethers/lib/utils";
import { decodeTokenId, encodeTokenId } from "config/tokenIdEncoder";
import { Token } from "interfaces/token.interface";
import { Chain } from "interfaces/chain.interface";
import { findChain, findTokens } from "config";

const fetchBalancesIndex = atom<number>({
  key: "atom/fetch-balances",
  default: 1,
});

interface BalanceByTokenId {
  [tokenId: string]: string;
}

export const fetchBalancesQuery = selector<BalanceByTokenId>({
  key: "selector/fetch-balances",
  get: async ({ get }) => {
    get(fetchBalancesIndex);
    const account = get(accountAtom);
    if (!account) return {};

    const balancesByChain = await Promise.allSettled(
      CHAINS.map(async (chain) => {
        TOKENS[chain.chainId] = TOKENS[chain.chainId] ?? [];

        const balances = await getTokenBalances(
          account,
          chain,
          TOKENS[chain.chainId].map((t) => t.address)
        );

        return TOKENS[chain.chainId].reduce((acc, token, index) => {
          const bal = formatUnits(balances[index], token.decimals);
          if (+bal > 0) acc[encodeTokenId(token)] = bal;
          return acc;
        }, {} as BalanceByTokenId);
      })
    );

    return balancesByChain.reduce((acc, balancesResult) => {
      if (balancesResult.status === "fulfilled")
        Object.assign(acc, balancesResult.value);
      return acc;
    }, {} as BalanceByTokenId);
  },
});

// get balance by token id given chain(currentChain)
// token id :: `${this.chainId}_${this.address}`;
export const balancesState = selectorFamily<string | null, string | null>({
  key: "selector/balances",
  get:
    (tokenId) =>
    ({ get }) => {
      return tokenId ? get(fetchBalancesQuery)[tokenId] ?? null : null;
    },
});

/** token에 대한 Balance를 가져올 때 사용
 * @param token 토큰 종류
 * @param defaultText optional, balance를 가져오지 못했거나, Owner 주소가 없을 때 띄울 텍스트. default = ""
 *
 * 아래와 같이 사용하여 tokenA에 대한 currentUser의 balance를 얻을 수 있다.
 * const userTokenBalance = useBalance(tokenA);
 *
 */
export const useBalance = (token: Token | null): string => {
  if (!token) return "";
  const tokenId = encodeTokenId(token);
  const balanceState = useRecoilValueLoadable(balancesState(tokenId ?? null));
  return token && balanceState.state === "hasValue" && balanceState.contents
    ? balanceState.contents
    : "";
};

export const useTokenBalancesInChain = (chainId: number) => {
  const allBalances = useRecoilValueLoadable(fetchBalancesQuery);
  if (allBalances.state === "hasValue") {
    const balancesMap = Object.entries(allBalances.contents).reduce(
      (acc, [tokenId, amount]) => {
        const decoded = decodeTokenId(tokenId);
        if (decoded.chainId === chainId) {
          acc.push({ address: decoded.address, amount });
        }
        return acc;
      },
      [] as { address: string; amount: string }[]
    );
    return balancesMap;
  } else {
    return null;
  }
};

export const useRefreshBalance = () => {
  const setIndex = useSetRecoilState(fetchBalancesIndex);
  return () => setIndex((prev) => prev + 1);
};

export interface TokenBalanceByChain {
  chain: Chain;
  totalTokenUSD: number;
  tokens: {
    token: Token;
    balance: string;
  }[];
}
export const useTokenBalancesByChain = (): TokenBalanceByChain[] | null => {
  const allBalances = useRecoilValueLoadable(fetchBalancesQuery);
  if (allBalances.state === "hasValue") {
    const balancesMap = Object.entries(allBalances.contents).reduce(
      (acc, [tokenId, amount]) => {
        const { chainId, address } = decodeTokenId(tokenId);
        acc[+chainId] = acc[+chainId] || [];
        acc[+chainId].push({ address, amount });
        return acc;
      },
      {} as Record<number, { address: string; amount: string }[]>
    );
    return Object.entries(balancesMap).map(([chainId, balances]) => {
      const chain = findChain(+chainId)!;
      const targetTokens = findTokens(
        +chainId,
        balances.map(({ address }) => address),
        false
      );
      let totalTokenUSD = 0;

      const tokens = targetTokens.map((token, i) => {
        totalTokenUSD += +token.priceUSD * +balances[i].amount;
        return {
          token,
          balance: balances[i].amount,
        };
      });
      return {
        chain,
        totalTokenUSD,
        tokens,
      };
    });
  } else {
    return null;
  }
};
