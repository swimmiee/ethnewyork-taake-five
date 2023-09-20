import { useWeb3SocialLogin } from "config/biconomy/biconomy-web3-auth";
import "./biconomy.css";

interface ConnectBiconomyProps {
  chainId: number;
}
export const ConnectBiconomy = ({ chainId }: ConnectBiconomyProps) => {
  const login = useWeb3SocialLogin(chainId);
  return (
    <button onClick={login} className="btn bg-orange-500 text-white">
      Start with Biconomy
    </button>
  );
};
