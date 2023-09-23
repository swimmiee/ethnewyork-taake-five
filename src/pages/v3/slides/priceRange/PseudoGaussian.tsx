import { findChain, findTokens } from "config";
import { V3Invests } from "config/invests.config";
import { Step } from "pages/v3/step.enum";
import { useEffect, useState } from "react";
import { useV3Selection } from "states/v3-global.states";
import { UniswapV3Pool__factory } from "typechain";
import { cn } from "utils/cn";
import { toFixedCond } from "utils/formatter";
import { getProvider } from "utils/getProvider";

const virtualTickSize = 360;
const points = Array(virtualTickSize + 1)
  .fill(0)
  .map((_, i, arr) => {
    const x = (i - (arr.length - 1) / 2) / (arr.length / 3.3);
    const y = Math.exp(-x * x);
    return { x, y };
  });
// default: 1 sigma = 68.27%
const oneSigma = Math.floor(virtualTickSize * 0.34);

export const PseudoGaussian = () => {
  const [currentTick, setCurrentTick] = useState<number>();
  const [investId] = useV3Selection(Step.Investment);
  const invest = V3Invests.find((i) => i.id === investId)!;
  const [token0, token1] = findTokens(invest.chainId, invest.inputAssets, true);
  const [isToken0, setIsToken0] = useState<boolean>(token0.type !== "STABLE");

  const [, setPriceRange] = useV3Selection(Step.PriceRange);

  const tick2Price = (tick: number | undefined) => {
    const price =
      1.0001 ** (tick ?? 0) * 10 ** (token0.decimals - token1.decimals);
    return toFixedCond(isToken0 ? price : 1 / price, 3);
  };

  const chain = findChain(invest.chainId)!;
  const provider = getProvider(chain);

  const [tickAmount, setTickAmount] = useState(oneSigma);
  const sp = invest.meta.tickSpacing;
  const standardTickGap = sp * 3;

  const tickGap =
    Math.floor((tickAmount * standardTickGap) / oneSigma / sp) * sp + sp;

  const tU = (currentTick ?? 0) + tickGap;
  const tL = (currentTick ?? 0) - tickGap;

  useEffect(() => {
    UniswapV3Pool__factory.connect(invest.address, provider)
      .slot0()
      .then(({ tick }) => {
        setCurrentTick(tick);
        setPriceRange(`${tick - tickGap}-${tick + tickGap}`);
      });
  }, []);

  const onChangeTick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTickAmount(Number(e.target.value));
    setPriceRange(`${tL}-${tU}`);
  };

  return (
    <div>
      <div className="flex flex-1 h-[108px] items-end ">
        {points.map((point, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 border-y-[1.5px]",
              Math.abs(i - virtualTickSize / 2) < tickAmount
                ? "border-y-black bg-primary-500"
                : "border-y-neutral-500 bg-neutral-50"
            )}
            style={{
              height: `${point.y * 100}%`,
            }}
          />
        ))}
      </div>
      <div className="flex">
        <input
          type="range"
          className="flex-1"
          dir="rtl"
          min={1}
          max={virtualTickSize / 2}
          value={tickAmount}
          onChange={onChangeTick}
        />
        <input
          type="range"
          className="flex-1"
          value={tickAmount}
          min={1}
          max={virtualTickSize / 2}
          onChange={onChangeTick}
        />
      </div>

      <div className="h-6 flex justify-around text-sm">
        {currentTick !== undefined && (
          <>
            <p>{tick2Price(isToken0 ? tL : tU)}</p>
            <p>{tick2Price(currentTick)}</p>
            <p>{tick2Price(isToken0 ? tU : tL)}</p>
          </>
        )}
      </div>
    </div>
  );
};
