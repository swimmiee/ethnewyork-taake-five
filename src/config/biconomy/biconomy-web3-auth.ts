import { providers } from "ethers";
import { useEffect, useState } from "react";
import {
  $biconomySocialSDK,
  initBiconomySocialSDK,
} from "states/biconomy.state";
import { getBiconomyAPI } from "./biconomy.configs";
import { BiconomySmartAccount } from "@biconomy/account";
import { $account } from "states/account.state";

export const useWeb3SocialLogin = (chainId: number) => {
  const [interval, enableInterval] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sdk = $biconomySocialSDK.getValue();
    let configureLogin: any;
    if (interval) {
      configureLogin = setInterval(() => {
        if (!!sdk.provider) {
          setupSmartAccount();
          clearInterval(configureLogin);
        }
      }, 1000);
    }
  }, [interval]);

  const login = async () => {
    const chainId = 1;
    initBiconomySocialSDK(chainId);

    const sdk = $biconomySocialSDK.getValue();
    if (!sdk.provider) {
      sdk.showWallet();
      enableInterval(true);
    } else {
      setupSmartAccount();
    }
  };

  const setupSmartAccount = async () => {
    const sdk = $biconomySocialSDK.getValue();

    if (!sdk?.provider) return;
    sdk.hideWallet();
    setLoading(true);
    const web3Provider = new providers.Web3Provider(sdk.provider);
    // setProvider(web3Provider);

    try {
      const { bundler, paymaster } = getBiconomyAPI(chainId);
      let biconomySmartAccount = new BiconomySmartAccount({
        signer: web3Provider.getSigner(),
        chainId,
        bundler,
        paymaster,
      });
      biconomySmartAccount = await biconomySmartAccount.init();
      console.log("owner: ", biconomySmartAccount.owner);
      console.log(
        "address: ",
        await biconomySmartAccount.getSmartAccountAddress()
      );
      console.log(
        "deployed: ",
        await biconomySmartAccount.isAccountDeployed(
          await biconomySmartAccount.getSmartAccountAddress()
        )
      );

      console.log({
        from: "biconomy",
        provider: web3Provider,
        signer: web3Provider.getSigner(),
        // @ts-ignore
        address: biconomySmartAccount.address,
      });
      $account.next({
        from: "biconomy",
        provider: web3Provider,
        signer: web3Provider.getSigner(),
        // @ts-ignore
        address: biconomySmartAccount.address,
      });
      setLoading(false);
    } catch (err) {
      console.log("error setting up smart account... ", err);
    }
  };

  return login;
};
