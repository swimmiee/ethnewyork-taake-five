import { Wrapper } from "pages/v3/sections/Wrapper";
import { PseudoGaussian } from "./PseudoGaussian";

export const PriceRange = () => {
  return (
    <Wrapper>
      <p className="text-2xl">Select Price Range</p>
      <p className="text-sm text-neutral-500 mb-6">Learn Uniswap V3 Risks</p>
      <PseudoGaussian />
    </Wrapper>
  );
};
