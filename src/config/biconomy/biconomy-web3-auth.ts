import { providers } from "ethers";
import { useEffect, useState } from "react";
import {
  $biconomySocialSDK,
  initBiconomySocialSDK,
} from "states/biconomy.state";
import { getBiconomyAPI } from "./biconomy.configs";
import { BiconomySmartAccount } from "@biconomy/account";
import { useSetAccount } from "states/account.state";

export const useBiconomyWeb3SocialLogin = (chainId: number) => {
  const [interval, enableInterval] = useState(false);
  const [loading, setLoading] = useState(false);
  const setAccount = useSetAccount<"biconomy">();

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
    initBiconomySocialSDK(chainId);

    const sdk = $biconomySocialSDK.getValue();
    if (!sdk.provider) {
      sdk.showWallet();
      enableInterval(true);
    } else {
      setupSmartAccount();
    }
  };

  const logout = async () => {
    const sdk = $biconomySocialSDK.getValue();
    if (!sdk) {
      console.error("Web3Modal not initialized.");
      return;
    }
    await sdk.logout();
    sdk.hideWallet();
    setAccount(null);
    enableInterval(false);
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
      const biconomySmartAccount = await new BiconomySmartAccount({
        signer: web3Provider.getSigner(),
        chainId,
        bundler,
        paymaster,
      }).init();
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

      setAccount({
        from: "biconomy",
        provider: web3Provider,
        signer: web3Provider.getSigner(),
        // @ts-ignore
        address: biconomySmartAccount.address,
        meta: {
          smartAccount: biconomySmartAccount,
        },
      });

      setLoading(false);
    } catch (err) {
      console.log("error setting up smart account... ", err);
    }
  };

  return { loading, login, logout };
};
