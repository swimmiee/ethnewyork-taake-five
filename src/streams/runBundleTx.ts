import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
} from "@biconomy/paymaster";
import { BigNumber, ethers } from "ethers";
import { Account } from "states/account.state";

interface Tx {
  data: string;
  to: string;
  value?: BigNumber;
}

export const runBundleTxs = async (account: Account, txs: Tx[]) => {
  if (account.from === "biconomy") {
    const {
      meta: { smartAccount },
    } = account as Account<"biconomy">;

    let partialUserOp = await smartAccount.buildUserOp(txs);
    const biconomyPaymaster =
      smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;

    let paymasterServiceData: SponsorUserOperationDto = {
      mode: PaymasterMode.SPONSORED,
    };

    try {
      const paymasterAndDataResponse =
        await biconomyPaymaster.getPaymasterAndData(
          partialUserOp,
          paymasterServiceData
        );

      partialUserOp.paymasterAndData =
        paymasterAndDataResponse.paymasterAndData;

      const userOpResponse = await smartAccount.sendUserOp(partialUserOp);
      console.log("userOpResponse");
      const transactionDetails = await userOpResponse.wait();

      console.log("Transaction Details:", transactionDetails);
      console.log(
        "Transaction Hash:",
        transactionDetails.receipt.transactionHash
      );

      return {
        txHash: transactionDetails.receipt.transactionHash,
        tokenId: getTokenIdFromReceipt(transactionDetails.receipt),
      };
    } catch (e) {
      console.error("Error executing transaction:", e);
      // ... handle the error if needed ...
      return null;
    }
  }
};

const INCREASE_EVENT_SIGNATURE =
  "0x3067048beee31b25b2f1681f88dac838c8bba36af25bfb2b7cf7473a5847e35f";
const getTokenIdFromReceipt = (
  receipt: ethers.providers.TransactionReceipt
) => {
  const tokenIdLog = receipt.logs.filter(
    (l) => l.topics[0] === INCREASE_EVENT_SIGNATURE
  );

  if (tokenIdLog.length === 0) throw Error("Tx failed");
  const tokenId = tokenIdLog[tokenIdLog.length - 1].topics[1];
  return BigNumber.from(tokenId).toNumber();
};
