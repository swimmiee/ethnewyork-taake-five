import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
} from "@biconomy/paymaster";
import { BigNumber } from "ethers";
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
    } catch (e) {
      console.error("Error executing transaction:", e);
      // ... handle the error if needed ...
    }
  }

  return;
};
