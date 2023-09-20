import { ethers } from "ethers";
import { BehaviorSubject } from "rxjs";

export interface Account {
  from: "biconomy" | "safe";
  provider: ethers.providers.Provider;
  signer: ethers.Signer;
  address: string;
}
export const $account = new BehaviorSubject<Account | null>(null);
