import { Wrapper } from "pages/v3/sections/Wrapper";
import { AddButton } from "./AddButton";
import { useModal } from "utils/hooks/useModal";
import { InputModal } from "./InputModal";
import { useV3Selection } from "states/v3-global.states";
import { Step } from "pages/v3/step.enum";
import { TokenAmount } from "./TokenAmount";

export const InputAmount = () => {
  const [isOpen, openModal, closeModal] = useModal(false);
  const [inputs, setInputs] = useV3Selection(Step.Input);
  const tokemAmountList = Array.from(
    new URLSearchParams((inputs ?? "") as string).entries()
  );
  const deleteToken = (tokenId: string) => {
    const prev = new URLSearchParams((inputs ?? "") as string);
    prev.delete(tokenId);
    setInputs(prev.toString());
  };

  return (
    <Wrapper>
      {tokemAmountList.map(([tokenId, amount], i) => (
        <TokenAmount
          key={i}
          del={() => deleteToken(tokenId)}
          tokenId={tokenId}
          amount={amount}
        />
      ))}
      <AddButton onClick={openModal} />

      {isOpen && <InputModal closeModal={closeModal} />}
    </Wrapper>
  );
};
