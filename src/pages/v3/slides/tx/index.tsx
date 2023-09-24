import { Wrapper } from "pages/v3/sections/Wrapper";
import { useV3Selection, useV3Step } from "states/v3-global.states";
import { Step } from "pages/v3/step.enum";
import { V3Invests } from "config/invests.config";
import { findToken, findTokens } from "config";
import { useEffect, useState } from "react";
import { TxDescription, getInvestTx } from "streams/getInvestTx";
import { Footer } from "pages/v3/sections/Footer";
import { runBundleTxs } from "streams/runBundleTx";
import { $account } from "states/account.state";
import { useModal } from "utils/hooks/useModal";
import { IoChevronForward } from "react-icons/io5";
import { TxInfoModal } from "./TxInfoModal";

export const TXSlide = () => {
  const [investId] = useV3Selection(Step.Investment);
  const [priceRange] = useV3Selection(Step.PriceRange);
  const [, setStep] = useV3Step();
  const [, setTxResult] = useV3Selection(Step.Pending);
  const invest = V3Invests.find((i) => i.id === investId)!;
  const tokens = findTokens(invest.chainId, invest.inputAssets, true);
  const [inputsQS] = useV3Selection(Step.Input);
  const inputs = Array.from(
    new URLSearchParams(inputsQS as string).entries()
  ).map(([k, v]) => ({ token: findToken(k)!, amount: v }));

  const [isOpen, openModal, closeModal] = useModal(false);

  const [txs, setTxs] = useState<TxDescription[]>([]);
  useEffect(() => {
    const account = $account.getValue();
    if (!account) return;
    const [tickLower, tikUpper] = (priceRange as string).split("_").map(Number);
    console.log(tickLower, tikUpper);
    getInvestTx(inputs, invest, tickLower, tikUpper, account.address).then(
      (txs) => setTxs(txs)
    );
  }, []);

  const runTx = async () => {
    setStep(Step.Pending);
    const account = $account.getValue();
    console.log(txs.length, account);
    if (!txs.length || !account) return;
    return runBundleTxs(
      account,
      txs.map((t) => ({
        to: t.to,
        data: t.data,
        value: t.value,
      }))
    ).then((res) => {
      if (res) {
        setTxResult(`${res.txHash}_${res.tokenId}`);
      }
    });
  };

  const descriptions = txs.flatMap((t) => t.description);
  return (
    <Wrapper>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-col items-center">
          <img src="/Check.svg" className="w-[88px]" />
          <p className="text-3xl my-2">Are you ready?</p>
          <p className="text-xl text-neutral-500">
            Only one click away from investing!
          </p>
        </div>

        <div className="flex flex-col border-[1.5px] border-black rounded-xl p-4 mt-4 gap-2">
          {/* NAME */}
          <div className="flex items-center gap-2">
            <img src="/Check.svg" className="w-5" />

            <p>
              {invest.project} {tokens.map((t) => t.symbol).join(" + ")}
            </p>
          </div>

          {/* FEE */}
          <div className="flex items-center gap-2">
            <img src="/Check.svg" className="w-5" />

            <p>Fee {invest.meta.feeTier / 1e4}%</p>
          </div>

          {/* TXS */}
          <div className="flex items-center gap-2">
            <img src="/Check.svg" className="w-5" />
            <p>
              Run&nbsp;
              <b>
                {descriptions.length > 0 ? descriptions.length : " "}
                &nbsp;transactions
              </b>
              &nbsp;by ONE CLICK
            </p>
          </div>
        </div>
        <div onClick={openModal} className="flex justify-end items-center mt-1">
          <p className=" text-lg">Transaction Details</p>
          <IoChevronForward size={18} />
        </div>
      </div>

      {isOpen && (
        <TxInfoModal closeModal={closeModal} descriptions={descriptions} />
      )}

      <Footer onNext={runTx} />
    </Wrapper>
  );
};
