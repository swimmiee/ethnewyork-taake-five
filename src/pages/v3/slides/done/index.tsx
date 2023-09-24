import { findChain } from "config";
import { V3Invests } from "config/invests.config";
import { Wrapper } from "pages/v3/sections/Wrapper";
import { Step } from "pages/v3/step.enum";
import { useV3Selection } from "states/v3-global.states";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 이거 없다는데 머지

export const Done = () => {
  const [investId] = useV3Selection(Step.Investment);
  const [txInfo] = useV3Selection(Step.Pending);
  const [txHash, tokenId] = (txInfo as string).split("_");

  // Tip: User가 선택한 Invest 정보는 여기 있습니다~
  const invest = V3Invests.find((i) => i.id === investId)!;
  const chain = findChain(invest.chainId)!;
  const explorer = `${chain.explorer}tx/${txHash}`;
  const uniswap = `https://app.uniswap.org/pools/${tokenId}`;

  const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOn(!isOn);
    if (!isOn) {
      // Redirect to a certain URL when turning the button on
      navigate('/your-specific-url');
    }
  };

  return (
    <Wrapper>
      <div>
      <h1>Toggle Button</h1>
      <button onClick={handleToggle}>{isOn ? 'Turn Off' : 'Turn On'}</button>
    </div>

      <a target="_blank" href={explorer}>
        Block Explorer
      </a>
      <a target="_blank" href={uniswap}>
        Go to UniswapV3
      </a>
    </Wrapper>
  );
};
