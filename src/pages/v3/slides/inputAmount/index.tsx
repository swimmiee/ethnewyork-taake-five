import { Step } from "pages/v3/step.enum";
import { Wrapper } from "pages/v3/sections/Wrapper";
import { AddButton } from "./AddButton";
import { useModal } from "utils/hooks/useModal";
import { InputModal } from "./InputModal";
import { useV3Selection } from "states/v3-global.states";
import { TokenAmount } from "./TokenAmount";
import { ConnectWalletSection } from "./wallet";
import { V3Invests } from "config/invests.config";
import { useEffect, useState } from "react";
import { $account, Account } from "states/account.state";

export const InputAmount = () => {
  // ACCOUNT
  const [account, setAccount] = useState<Account | null>(null);
  useEffect(() => {
    $account.subscribe((account) => {
      setAccount(account);
    });
  }, []);

  const [investId] = useV3Selection(Step.Investment);
  const invest = V3Invests.find((i) => i.id === investId)!;

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
      <p className="text-3xl">Which token</p>
      <p className="text-3xl">do you want to invest?</p>

      <ConnectWalletSection account={account} chainId={invest.chainId} />

      <div className="flex flex-col mt-6 gap-4">
        {tokemAmountList.map(([tokenId, amount], i) => (
          <TokenAmount
            key={i}
            del={() => deleteToken(tokenId)}
            tokenId={tokenId}
            amount={amount}
          />
        ))}
        <AddButton onClick={openModal} />
      </div>

      {isOpen && <InputModal invest={invest} closeModal={closeModal} />}
    </Wrapper>
  );
};
