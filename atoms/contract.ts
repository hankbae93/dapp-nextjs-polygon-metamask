import { Contract } from "ethers";
import { atom } from "recoil";
import { Signer, Web3Provider } from "../types";

interface Web3State {
  Provider: Web3Provider | null;
  Signer: Signer | null;
  Contract: Contract | null;
  account: string;
}

export const web3State = atom<Web3State>({
  key: "web3",
  default: {
    Provider: null,
    Signer: null,
    Contract: null,
    account: "",
  },
});
