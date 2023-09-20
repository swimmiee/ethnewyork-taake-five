import { Account } from "states/account.state";
import { ConnectBiconomy } from "./ConnectBiconomy";

interface ConnectWalletSectionProps {
  account: Account | null;
  chainId: number;
}
export const ConnectWalletSection = ({
  chainId,
  account,
}: ConnectWalletSectionProps) => {
  return (
    <section>
      {account ? (
        <div>
          <p className="text-lg">Wallet Provider: {account.from}</p>
          <p>{account.address}</p>
        </div>
      ) : (
        <>
          <ConnectBiconomy chainId={chainId} />
        </>
      )}
    </section>
  );
};
