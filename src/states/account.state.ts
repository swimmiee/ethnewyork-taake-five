import { BiconomySmartAccount } from "@biconomy/account";
import { ethers } from "ethers";
import { atom, useSetRecoilState } from "recoil";
import { BehaviorSubject } from "rxjs";

type AAprovider = "biconomy" | "safe";
type AccountMeta<T extends AAprovider> = T extends "biconomy"
  ? {
      smartAccount: BiconomySmartAccount;
    }
  : T extends "safe"
  ? {}
  : never;
export interface Account<T extends AAprovider = any> {
  from: T;
  provider: ethers.providers.Provider;
  signer: ethers.Signer;
  address: string;
  meta: AccountMeta<T>;
}
export const $account = new BehaviorSubject<Account | null>(null);

export const accountAtom = atom<string | null>({
  key: "atom/account",
  default: null,
});

export function useSetAccount<T extends AAprovider>() {
  const setAccountState = useSetRecoilState(accountAtom);

  return (account: Account<T> | null) => {
    setAccountState(account ? account.address : null);
    $account.next(account);
  };
}
