import { Account } from "states/account.state";
import { ConnectBiconomy } from "./ConnectBiconomy";
import { useBiconomyWeb3SocialLogin } from "config/biconomy/biconomy-web3-auth";

interface ConnectWalletSectionProps {
  account: Account | null;
  chainId: number;
}
export const ConnectWalletSection = ({
  chainId,
  account,
}: ConnectWalletSectionProps) => {
  const { logout } = useBiconomyWeb3SocialLogin(chainId);

  return (
    <section className="flex flex-col mt-4">
      {account ? (
        <div>
          <p className="text-lg">Wallet Provider: {account.from}</p>
          <p>{account.address}</p>
          <p onClick={logout}>Logout</p>
        </div>
      ) : (
        <>
          <ConnectBiconomy chainId={chainId} />
        </>
      )}
    </section>
  );
};
