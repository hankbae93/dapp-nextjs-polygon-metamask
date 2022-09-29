import { Contract, ethers } from "ethers";
import { atom } from "recoil";

interface Web3State {
  Provider: ethers.providers.Web3Provider | null;
  Signer: ethers.providers.JsonRpcSigner | null;
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
