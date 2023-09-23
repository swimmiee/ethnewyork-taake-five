import Modal from "pages/common/Modal";
import { V3Invests } from "config/invests.config";
import { Step } from "pages/v3/step.enum";
import { useV3Selection } from "states/v3-global.states";
import { BalanceList } from "./slides/BalanceList";
import { useState } from "react";
import { Token } from "interfaces/token.interface";
import { encodeTokenId } from "config/tokenIdEncoder";
import { TokenAmount } from "./slides/TokenAmount";

interface InputModalProps {
  closeModal: () => void;
}
export const InputModal = ({ closeModal }: InputModalProps) => {
  const [investId] = useV3Selection(Step.Investment);
  const invest = V3Invests.find((i) => i.id === investId)!;
  const [selectedTokenId, setSelectedTokenId] = useState<string>();
  const selectToken = (t: Token) => setSelectedTokenId(encodeTokenId(t));
  const unselect = () => setSelectedTokenId(undefined);

  const [inputs, setInputs] = useV3Selection(Step.Input);
  const addInput = (token: Token, amount: string) => {
    const qs = new URLSearchParams(inputs === null ? "" : (inputs as string));
    qs.set(encodeTokenId(token), amount);
    setInputs(qs.toString());
    closeModal();
  };

  return (
    <Modal title="Select Input Token" closeModal={closeModal}>
      {selectedTokenId ? (
        <TokenAmount tokenId={selectedTokenId} addInput={addInput} unselect={unselect} />
      ) : (
        <BalanceList chainId={invest.chainId} selectToken={selectToken} />
      )}
    </Modal>
  );
};
