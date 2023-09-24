import { findChain } from "config";
import { V3Invests } from "config/invests.config";
import { Wrapper } from "pages/v3/sections/Wrapper";
import { Step } from "pages/v3/step.enum";
import { useV3Selection } from "states/v3-global.states";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 이거 없다는데 머지
import { BsTelegram } from "react-icons/bs";

export const Done = () => {
  const [investId] = useV3Selection(Step.Investment);
  const [txInfo] = useV3Selection(Step.Pending);
  const [txHash, tokenId] = (txInfo as string) ?? "_".split("_");

  // Tip: User가 선택한 Invest 정보는 여기 있습니다~
  const invest = V3Invests.find(
    (i) => i.id === (investId ?? "64ee0317398fb056385a33c7")
  )!;
  const chain = findChain(invest.chainId)!;
  const explorer = `${chain.explorer}tx/${txHash}`;
  const uniswap = `https://app.uniswap.org/pools/${tokenId}`;

  const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOn(!isOn);
    if (!isOn) {
      // Redirect to a certain URL when turning the button on
      navigate("/your-specific-url");
    }
  };

  return (
    <Wrapper>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-col items-center">
          <p style={{ fontSize: 80 }}>🎉</p>
          <p className="text-3xl my-2">Done !</p>
        </div>

        <div className="flex flex-col gap-4 px-4 mt-8">
          <a target="_blank" href={explorer}>
            <button className="btn btn-primary hover:btn-primary-active w-full">
              View on Block Explorer
            </button>
          </a>
          <a target="_blank" href={uniswap}>
            <button className="btn btn-primary hover:btn-primary-active w-full">
              View on Uniswap V3
            </button>
          </a>
          <a target="_blank" href={uniswap}>
            <button className="flex-center gap-2 btn btn-primary hover:btn-primary-active w-full">
              Get Notification on Telegram{" "}
              <BsTelegram size={21} color="#229ED9" />
            </button>
          </a>
        </div>
      </div>
    </Wrapper>
  );
};
