export const MIN_TVL = 5_000;
export const MIN_VOLUME = 3_000;

/**
 * @param subgraph  subgraph endpoint
 * @param category  "UniswapV3", "Curve", ...
 * @param pools     array of pool addresses
 * @param timePast  어느 시점의 과거 데이터와 비교할 것인가 (second)
 */

export async function getExchangeDynamicData({
  sourceApi,
  project,
  pools,
  meta,
  chainId,
}: any): Promise<any[]> {
  if (this.testnet.isTestnet(chainId)) {
    return this.testnet.createTestnetData(pools, chainId, project);
  }

  const tokens = await this.prisma.token.findMany({
    where: {
      chainId: chainId,
    },
    select: {
      address: true,
      priceUSD: true,
    },
  });
  const tokenPrices = {};
  tokens.forEach((t) => {
    tokenPrices[t.address.toLowerCase()] = t.priceUSD;
  });

  let results: any[] = [];

  switch (project) {
    case "Uniswap V3":
      results = await this.uniswapV3
        .getUniswapV3PoolData(sourceApi, pools, chainId)
        .then(({ poolData }) => {
          return poolData.map((pool) =>
            this.uniswapV3.calculateAprTicks(pool, tokenPrices, null)
          );
        });
      break;
    case "Pancakeswap V3":
      results = await this.pancakeswapV3
        .getPancakeswapV3PoolData(sourceApi, pools, chainId, meta["masterChef"])
        .then(({ poolData, cakesPerSecond, cakePrice }) => {
          return poolData.map((pool) => {
            return this.uniswapV3.calculateAprTicks(pool, tokenPrices, {
              price: cakePrice,
              amountPerSecond: cakesPerSecond.get(pool[0].id) ?? 0,
            });
          });
        });
      break;
    case "Curve":
      results = await this.curve.updateCurvePools(pools, chainId);
      break;
    case "Lido":
      results = await this.lido.updateLidoPools(pools, chainId, tokenPrices);
      break;
    default:
      throw new Error("Not implemented yet");
  }

  return results.map(({ disabled, ...pool }) => ({
    ...pool,
    disabled:
      disabled ||
      pool.tvl < this.MIN_TVL ||
      (0 <= pool.volume24H && pool.volume24H < this.MIN_VOLUME) ||
      pool.apr <= 0,
  }));
}
