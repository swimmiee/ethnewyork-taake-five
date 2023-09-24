import { useBiconomyWeb3SocialLogin } from "config/biconomy/biconomy-web3-auth";
import { FaSpinner } from "react-icons/fa";
import "@biconomy/web3-auth/dist/src/style.css";


interface ConnectBiconomyProps {
  chainId: number;
}
export const ConnectBiconomy = ({ chainId }: ConnectBiconomyProps) => {
  const { login, loading } = useBiconomyWeb3SocialLogin(chainId);
  return loading ? (
    <div>
      <FaSpinner className="animate-spin" />
    </div>
  ) : (
    <button onClick={login} className="btn bg-orange-500 text-white">
      Start with Biconomy
    </button>
  );
};
