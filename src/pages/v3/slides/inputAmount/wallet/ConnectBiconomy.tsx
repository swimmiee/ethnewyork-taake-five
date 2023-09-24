import { useBiconomyWeb3SocialLogin } from "config/biconomy/biconomy-web3-auth";
import { FaSpinner } from "react-icons/fa";
import "@biconomy/web3-auth/dist/src/style.css";

interface ConnectBiconomyProps {
  chainId: number;
}
export const ConnectBiconomy = ({ chainId }: ConnectBiconomyProps) => {
  const { login, loading } = useBiconomyWeb3SocialLogin(chainId);
  return loading ? (
    <div className="flex-col flex-center py-8 mt-16">
      <FaSpinner className="animate-spin" size={64} />
      <p className="text-xl mt-8">Connecting...</p>
    </div>
  ) : (
    <button onClick={login} className="btn bg-orange-500 text-white">
      Start with Biconomy
    </button>
  );
};
