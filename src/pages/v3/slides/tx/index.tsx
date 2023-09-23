import { Wrapper } from "pages/v3/sections/Wrapper";
import { IoCheckmarkCircle } from "react-icons/io5";
import { BsCheck2Circle, BsPlusCircle } from "react-icons/bs";
import { useV3Selection } from "states/v3-global.states";
import { Step } from "pages/v3/step.enum";
import { V3Invests } from "config/invests.config";
import { findTokens } from "config";
import { useState } from "react";

export const TXSlide = () => {
  const [investId] = useV3Selection(Step.Investment);
  const [priceRange] = useV3Selection(Step.PriceRange);
  const invest = V3Invests.find((i) => i.id === investId)!;
  const tokens = findTokens(invest.chainId, invest.inputAssets, true);

  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const toggle = () => setOpenInfo((p) => !p);

  return (
    <Wrapper className="justify-center">
      <div className="flex flex-col items-center">
        <p className="text-3xl mb-2">You're ready to invest!</p>
        <IoCheckmarkCircle color="#0077ff" size={80} />
      </div>

      <div className="flex flex-col bg-neutral-50 rounded-xl p-4 mt-4 gap-2">
        {/* NAME */}
        <div className="flex items-center gap-2">
          <BsCheck2Circle size={24} />
          <p>
            {invest.project} {tokens.map((t) => t.symbol).join(" + ")}
          </p>
        </div>

        {/* FEE */}
        <div className="flex items-center gap-2">
          <BsCheck2Circle size={24} />
          <p>Fee {invest.meta.feeTier / 1e4}%</p>
        </div>

        {/* Tx Info */}
        <div onClick={toggle} className="flex gap-2">
          <div className="w-6 h-6 flex-center">
            <BsPlusCircle size={20} />
          </div>
          <div>
            <p>Transaction Info</p>
            {!openInfo && <div>asdasdasdasdasd</div>}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
