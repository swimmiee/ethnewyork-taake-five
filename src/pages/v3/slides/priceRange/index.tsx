import { Wrapper } from "pages/v3/sections/Wrapper";
import { PseudoGaussian } from "./PseudoGaussian";
import { Description } from "./Description";

export const PriceRange = () => {
  return (
    <Wrapper>
      <p className="text-2xl">Select Price Range</p>
      <p className="text-sm text-neutral-500 mb-6">Learn Uniswap V3 Risks</p>
      <PseudoGaussian />

      <div className="flex flex-col gap-2">
        <Description
          title="What is Price Range?"
          children={
            <div className="bg-neutral-100 py-2 px-4 rounded-lg">
              <li className="pl-6 -indent-6">
                In Uniswap V3, the price is the value of one token in terms of
                another token in a trading pair.
              </li>
              <li className="pl-6 -indent-6">
                For example, in the ETH/USDC trading pair, the price is the
                value of ETH in USDC, or vice versa.
              </li>
              <li className="pl-6 -indent-6">
                The price range is the min / max price at which you are willing
                to provide liquidity for a trading pair.
              </li>
              <li className="pl-6 -indent-6">
                You have to set the price to create a new Uniswap V3 position.
              </li>
              <li className="pl-6 -indent-6">
                You can accrue fees only when the current price is within the
                range of the price range you first defined.
              </li>
            </div>
          }
        />
        <Description
          title="What happens if the price is out of range?"
          children={
            <div className="bg-neutral-100 py-2 px-4 rounded-lg">
              <li className="pl-6 -indent-6">
                If current price out of your range, your position will be
                deactivated.
              </li>
              <li className="pl-6 -indent-6">
                This means that you cannot earn the swap fee.
              </li>
            </div>
          }
        />

        <Description
          title="Tips for choosing Price Range"
          children={
            <div>
              <img className="mx-auto w-4/5 mb-4" src="/PriceRangeDesc.svg" />
              <div className="bg-neutral-100 py-2 px-4 rounded-lg">
                <p className="text-xl font-semibold">
                  Should be NARROW enough to maximize your profits
                </p>
                <p>
                  The narrower the price range, the greater the fees you earn
                  per swap.
                </p>
                <p className="mt-2 text-xl font-semibold">
                  Should be WIDE enough to capture the expected volatility of
                  the asset.
                </p>
                <p>
                  If the fluctuations are severe, it becomes easier to go beyond
                  the price range, which increases the likelihood of not
                  receiving fees.
                </p>
                <p className="mt-2 text-xl font-semibold">
                  Not sure how to decide?
                </p>
                <p>
                  Based on historical price data for the past month, we
                  recommend the optimal price range for you!
                </p>
              </div>
            </div>
          }
        />
      </div>
    </Wrapper>
  );
};
