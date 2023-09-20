import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
} from "@biconomy/account";
import SocialLogin from "@biconomy/web3-auth";
import { getBiconomyAPI } from "config/biconomy/biconomy.configs";
import { providers, utils } from "ethers";
import { BehaviorSubject } from "rxjs";

export const $biconomySocialSDK = new BehaviorSubject<SocialLogin>(new SocialLogin());

export const initBiconomySocialSDK = async (chainId: number) => {
  const sdk = $biconomySocialSDK.getValue();
  const signature1 = await sdk.whitelistUrl("http://127.0.0.1:5173/");
  await sdk.init({
    chainId: utils.hexValue(chainId).toString(),
    network: "mainnet",
    whitelistUrls: {
      "http://127.0.0.1:5173/": signature1,
    },
  });
  $biconomySocialSDK.next(sdk);
};

export async function setupSmartAccount(chainId: number) {
  const sdk = $biconomySocialSDK.getValue();
  if (!sdk.provider) return;
  sdk.hideWallet();

  const web3Provider = new providers.Web3Provider(sdk.provider);

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

    return {
      
    }
  } catch (err) {
    console.log("error setting up smart account... ", err);
  }
}
