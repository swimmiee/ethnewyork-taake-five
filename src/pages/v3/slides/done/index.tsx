import { V3Invests } from "config/invests.config";
import { Wrapper } from "pages/v3/sections/Wrapper";
import { Step } from "pages/v3/step.enum";
import { useV3Selection } from "states/v3-global.states";

export const Done = () => {
  const [investId] = useV3Selection(Step.Investment);

  // Tip: User가 선택한 Invest 정보는 여기 있습니다~
  const invest = V3Invests.find((i) => i.id === investId);
  // console.log(invest)

  return (
    <Wrapper>
      <p>자경이가 여기에 텔레그램 관련된 내용 추가하면 됩니다~</p>
    </Wrapper>
  );
};
