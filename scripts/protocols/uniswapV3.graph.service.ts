import { JsonRpcProvider, Provider, getAddress, parseUnits } from "ethers";
import { query, syncBlockQuery } from "../thegraph-base.service";

const BASE_DENOM = 1e8;
const Q96 = 2n ** 96n;

const MIN_TVL = 10_000;
const MIN_VOLUME = 10_000;
const MAX_QUERY_COUNT = 100;

const poolQueryItem = `{
  id
  token0{
    id
    decimals
    symbol
  }
  token1{
    id
    decimals
    symbol
  }
  feeTier
  liquidity
  sqrtPrice
  token0Price
  token1Price
  tick
  volumeUSD
  feesUSD
  totalValueLockedUSD
  ${additionalPoolQueryItem()}
  poolDayData(orderBy:date, orderDirection:desc, first:8){
    date
    high
    low
    volumeUSD
    tvlUSD
  }
}`;

// if you want to get more info from this.poolQuery,
// override this method
// e.g. pancakeswap-protocolFeesUSD
function additionalPoolQueryItem() {
  return "";
}

function safeDiv(a: bigint, b: bigint): number {
  return Number((a * BigInt(this.BASE_DENOM)) / b) / this.BASE_DENOM;
}
function safeMulDiv(a: bigint, b: bigint, multiplier: bigint): bigint {
  return (a * b) / multiplier;
}

async function poolQuery(
  subgraph: string,
  blockNumber: number,
  poolAddresses: string[]
): Promise<any[]> {
  const parsedPoolIds = poolAddresses
    .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
    .map((pair) => `"${pair.toLowerCase()}"`);

  const queryString = (poolIds: string) => `query{
      pools(
        block:{ number: ${blockNumber} },
        where:{ id_in:[ ${poolIds} ] },
        orderBy: id,
        subgraphError: allow
      )${this.poolQueryItem}
    }`;

  const poolIdsList = parsedPoolIds.reduce<string[]>((acc, parsed, i) => {
    const queryIndex = Math.floor(i / this.MAX_QUERY_COUNT);
    if (queryIndex >= acc.length) acc.push("");
    acc[queryIndex] += parsed + ",";
    return acc;
  }, []);

  return Promise.all(
    poolIdsList.map((poolIds) => {
      return query<any>(subgraph, queryString(poolIds));
    }, this)
  ).then((res) => {
    return res.map((r) => r.pools).flat();
  });
}

async function getUniswapV3PoolData(
  sourceApi: string,
  pools: string[],
  chainId: number
) {
  const syncBlock = await syncBlockQuery(sourceApi);
  const chainData = await this.prisma.chain.findUnique({
    where: {
      chainId,
    },
    select: {
      rpcUrls: true,
      blockTime: true,
      multicallAddress: true,
    },
  });

  const { blockNumber: yesterdayBlockNum } = await getBlockNumberAt(
    new JsonRpcProvider(chainData.rpcUrls[0]),
    syncBlock.timestamp - 86400,
    chainData.blockTime
  );

  return {
    chainData,
    poolData: await Promise.all([
      this.poolQuery(sourceApi, syncBlock.blockNumber - 100000, pools),
      this.poolQuery(sourceApi, yesterdayBlockNum - 100000, pools),
    ]).then(([today, yesterday]) => {
      const yesterdayIds = yesterday.map((y) => y.id);
      today = today.filter((t: any) => yesterdayIds.includes(t.id));
      return today.map((todayPool: any, i) => {
        if (yesterday[i].id !== todayPool.id) {
          throw new Error("!UniswapV3Graph:getUniswapV3PoolData");
        }
        return [yesterday[i], todayPool];
      });
    }),
  };
}

async function calculateAprTicks(
  // [yesterday, today]
  poolData: any,
  tokenPrices: { [key: string]: number },
  lpRewards: {
    price: number; // CAKE, SUSHI, ...
    amountPerSecond: number;
  } | null
) {
  const nullResult = {
    address: getAddress(poolData[0].id),
    apr: 0, // 1 sigma apr
    tvl: 0,
    volume24H: 0,
    volume7D: 0,
    meta: {
      aprList: [0, 0, 0],
      rangeList: [
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      tick: 0,
    },
  };
  if (poolData.length < 2) return nullResult;

  const depositAmountUSD = 1000;
  const volume24H =
    poolData.length > 1
      ? Number(poolData[1].volumeUSD) - Number(poolData[0].volumeUSD)
      : Number(poolData[0]?.volumeUSD || 0);
  const pool = poolData[1];

  const tvlUSD = +pool?.totalValueLockedUSD || 0;
  const priceUSDX = tokenPrices[pool.token1.id.toLowerCase()];
  const priceUSDY = tokenPrices[pool.token0.id.toLowerCase()];
  const prices = pool.poolDayData.flatMap((p) => {
    if (+p.high === 0 || +p.low === 0) return [];
    return [+p.high, +p.low];
  });

  if (
    (tvlUSD < this.MIN_TVL && volume24H < this.MIN_VOLUME) ||
    priceUSDX <= 0 ||
    priceUSDY <= 0 ||
    prices.length === 0
  ) {
    return nullResult;
  }

  const price = this.getPriceFromTick(
    this.getNearestTick(priceUSDX / priceUSDY, pool.feeTier)
  );

  const std = this.removeOutliers(prices, +pool.token0Price, 2, pool.feeTier);
  const tick = this.getTickFromPrice(price);
  const tickSpace = this.getTickSpace(pool.feeTier);

  const volume7D = pool.poolDayData
    .slice(1)
    .map((p) => +p.volumeUSD)
    .reduce((a, b) => a + b);
  const priceTiers = [0.5, 1, 2];
  const feesUSD = poolData[0].protocolFeesUSD
    ? +poolData[1].feesUSD -
      +poolData[1].protocolFeesUSD -
      (+poolData[0].feesUSD - +poolData[0].protocolFeesUSD)
    : +poolData[1].feesUSD - +poolData[0].feesUSD;

  const aprs = priceTiers.map<any>((pT) => {
    const nullValue = {
      apr: 0,
      tickMin: 0,
      tickMax: 0,
      feeRatio: 0,
    };

    if (price <= 0) return nullValue;

    let tL =
      Math.floor((tick - std * pT) / this.getTickSpace(pool.feeTier)) *
      this.getTickSpace(pool.feeTier);
    let tU =
      Math.floor((tick + std * pT) / this.getTickSpace(pool.feeTier)) *
      this.getTickSpace(pool.feeTier);

    if (tL >= tick) tL = tick - tickSpace;
    if (tU <= tick) tU = tick + tickSpace;

    const pL = this.getPriceFromTick(tL);
    const pU = this.getPriceFromTick(tU);

    const { amount0, amount1 } = this.getTokensAmountFromDepositUSD(
      price,
      pL,
      pU,
      priceUSDX,
      priceUSDY,
      depositAmountUSD
    );

    // 내가 공급한 Liquidity
    const deltaL = this.getLiquidityDelta(
      price,
      pL,
      pU,
      amount0,
      amount1,
      +pool.token0?.decimals,
      +pool.token1?.decimals
    );

    const L = BigInt(pool.liquidity);

    if (L > 0n) {
      const feeRatio = this.safeDiv(deltaL, deltaL + L);
      return {
        apr: ((feeRatio * feesUSD * 365) / depositAmountUSD) * 100,
        tickMin: tL - tick,
        tickMax: tU - tick,
        feeRatio,
      };
    } else return nullValue;
  });

  const meta = {
    aprList: aprs.map((a) => a.apr),
    rangeList: aprs.map((a) => [a.tickMin, a.tickMax]),
    tick: this.getTickFromPrice(price),
  };

  if (lpRewards) {
    const yearMultiplier = 365 * 24 * 60 * 60;
    const lpRewardAprList = aprs.map(
      (a) =>
        ((a.feeRatio *
          yearMultiplier *
          lpRewards.price *
          lpRewards.amountPerSecond) /
          depositAmountUSD) *
        100
    );
    Object.assign(meta, { lpRewardAprList });
  }

  return {
    address: getAddress(pool.id),
    apr: aprs[1].apr, // 1 sigma apr
    tvl: +pool.totalValueLockedUSD,
    volume24H,
    volume7D,
    meta,
  };
}

function getTokensAmountFromDepositUSD(
  P: number,
  Pl: number,
  Pu: number,
  priceUSDX: number,
  priceUSDY: number,
  depositAmountUSD: number
): any {
  const deltaL =
    depositAmountUSD /
    ((Math.sqrt(P) - Math.sqrt(Pl)) * priceUSDY +
      (1 / Math.sqrt(P) - 1 / Math.sqrt(Pu)) * priceUSDX);

  let deltaY = deltaL * (Math.sqrt(P) - Math.sqrt(Pl));
  if (deltaY * priceUSDY < 0) deltaY = 0;
  if (deltaY * priceUSDY > depositAmountUSD)
    deltaY = depositAmountUSD / priceUSDY;

  let deltaX = deltaL * (1 / Math.sqrt(P) - 1 / Math.sqrt(Pu));
  if (deltaX * priceUSDX < 0) deltaX = 0;
  if (deltaX * priceUSDX > depositAmountUSD)
    deltaX = depositAmountUSD / priceUSDX;

  return { amount0: deltaX, amount1: deltaY };
}

function getLiquidityForAmount0(
  sqrtRatioAX96: bigint,
  sqrtRatioBX96: bigint,
  amount0: bigint
): bigint {
  const intermediate = this.safeMulDiv(sqrtRatioBX96, sqrtRatioAX96, this.Q96);

  return this.safeMulDiv(amount0, intermediate, sqrtRatioBX96 - sqrtRatioAX96);
}

function getLiquidityForAmount1(
  sqrtRatioAX96: bigint,
  sqrtRatioBX96: bigint,
  amount1: bigint
): bigint {
  return this.safeMulDiv(amount1, this.Q96, sqrtRatioBX96 - sqrtRatioAX96);
}

function getSqrtPriceX96(
  price: number,
  token0Decimal: number,
  token1Decimal: number
): bigint {
  const price0 = parseUnits(
    (this.BASE_DENOM * price).toFixed(token0Decimal),
    token0Decimal
  );
  const price1 = parseUnits("1", token1Decimal);

  return (Q96 * sqrt(price0)) / sqrt(price1) / sqrt(BigInt(BASE_DENOM));
}

function getLiquidityDelta(
  P: number, // token0 한개당 token1의 개수의 현재 가격
  lowerP: number, // token0 한개당 token1의 개수의 Range의 Min 값
  upperP: number, // token0 한개당 token1의 개수의 Range의 Max 값
  amount0: number, // token0의 개수
  amount1: number, // token1의 개수
  token0Decimal: number,
  token1Decimal: number
): bigint {
  // amount0 = token1의 개수??
  const amt0 = parseUnits(amount0.toFixed(token1Decimal), token1Decimal);
  const amt1 = parseUnits(amount1.toFixed(token0Decimal), token0Decimal);

  const sqrtRatioX96 = this.getSqrtPriceX96(P, token0Decimal, token1Decimal);
  const sqrtRatioAX96 = this.getSqrtPriceX96(
    lowerP,
    token0Decimal,
    token1Decimal
  );
  const sqrtRatioBX96 = this.getSqrtPriceX96(
    upperP,
    token0Decimal,
    token1Decimal
  );

  let liquidity: bigint;
  if (sqrtRatioX96 <= sqrtRatioAX96) {
    liquidity = this.getLiquidityForAmount0(sqrtRatioAX96, sqrtRatioBX96, amt0);
  } else if (sqrtRatioX96 < sqrtRatioBX96) {
    const liquidity0 = this.getLiquidityForAmount0(
      sqrtRatioX96,
      sqrtRatioBX96,
      amt0
    );
    const liquidity1 = this.getLiquidityForAmount1(
      sqrtRatioAX96,
      sqrtRatioX96,
      amt1
    );

    liquidity = liquidity0 > liquidity1 ? liquidity1 : liquidity0;
  } else {
    liquidity = this.getLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amt1);
  }

  return liquidity;
}

// private getLiquidityFromTick(poolTicks: Tick[], tick: number): bigint {
//   // calculate a cumulative of liquidityNet from all ticks that poolTicks[i] <= tick
//   let liquidity: bigint = this.ZERO;
//   for (let i = 0; i < poolTicks.length - 1; i++) {
//     liquidity += BigInt(poolTicks[i].liquidityNet);

//     const lowerTick = +poolTicks[i].tickIdx;
//     const upperTick = +poolTicks[i + 1]?.tickIdx;

//     if (lowerTick <= tick && tick <= upperTick) break;
//   }

//   return liquidity;
// }

function getTickSpace(tier: string): number {
  switch (tier) {
    case "100":
      return 1;
    case "500":
      return 10;
    case "2500":
      return 50;
    case "3000":
      return 60;
    case "10000":
      return 200;
    default:
      return 0;
  }
}

function getNearestTick(price: number, feeTier: string): number {
  const tick = this.getTickFromPrice(price);
  const tickSpace = this.getTickSpace(feeTier);
  return Math.floor(tick / tickSpace) * tickSpace;
}

//not used because uniswapV3 tvl is not accurate
function estimateFee(
  liquidityDelta: bigint,
  liquidity: bigint,
  volume24H: number,
  feeTier: string
): number {
  const liquidityPercentage = this.safeDiv(
    liquidityDelta,
    liquidity + liquidityDelta
  );
  return (+feeTier / 1e6) * volume24H * Number(liquidityPercentage);
}

function getTickFromPrice(price: number): number {
  return Math.floor(Math.log(price) / Math.log(1.0001));
}

function getPriceFromTick(tick: number): number {
  return 1.0001 ** tick;
}

// 주석 필요!
function removeOutliers(
  dataSet: number[],
  price: number,
  threshold: number,
  tickSpace: string
) {
  const avgOf = (nums: number[]) =>
    nums.length > 0 ? nums.reduce((a, b) => a + b) / nums.length : 0;

  // Calculate the mean and standard deviation
  const mean = avgOf(dataSet);
  const variance = avgOf(dataSet.map((d) => (d - mean) ** 2));
  const standardDeviation = Math.sqrt(variance);

  // Define the threshold for outliers (e.g., 2 or 3 standard deviations)

  // Filter out outliers and calculate min/max
  const filteredData = dataSet.filter(
    (value) => Math.abs(value - price) <= threshold * standardDeviation
  );

  const filteredTickData = filteredData.map((price) =>
    this.getNearestTick(price, tickSpace)
  );

  const filteredMean = avgOf(filteredTickData);
  const filteredVariance = avgOf(
    filteredTickData.map((d) => (d - filteredMean) ** 2)
  );

  // Return the filtered Standard deviation
  return Math.sqrt(filteredVariance);
}

// Call the function with the data set

/**
 * @param provider ethers.providers.Provider
 * @param target blockNumber을 알고자 하는 timestamp (unix, Date() / 1000)
 * @param blockTime Chain이 1블록 쌓는 데 걸리는 시간(단위: 초)
 * @param error 허용할 수 있는 시간 오차 (단위: 초), default=60(1분)
 */
export const getBlockNumberAt = async (
  provider: Provider,
  target: number,
  blockTime: number,
  error = 60
) => {
  // 초기값: 현재
  let estimated = await provider.getBlockNumber();
  let estimatedTime = new Date().getTime() / 1000;

  const targetTimeStamp = target;
  // heuristic으로 to 당시의 blocknumber을 구한다. -> 5회까지 반복하여 blocknumber 구함
  for (let i = 0; i < 5; i++) {
    const intervalBlocks = Math.floor(
      (estimatedTime - targetTimeStamp) / blockTime
    );
    estimated = estimated - intervalBlocks;
    estimatedTime = await provider
      .getBlock(estimated)
      .then((r: any) => r.timestamp);

    // default: 1분 차이 이내
    if (Math.abs(targetTimeStamp - estimatedTime) <= error) break;
  }
  return {
    blockNumber: estimated,
    timestamp: new Date(estimatedTime * 1000),
  };
};

/** sqrt BigInt **/
export function sqrt(x: bigint): bigint {
  let z = (x + 1n) / 2n;
  let y = x;
  while (z < y) {
    y = z;
    z = (x / z + z) / 2n;
  }
  return y;
}
