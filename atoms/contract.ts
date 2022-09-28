import { atom } from "recoil";

interface Web3State {
  Provider: any;
  Contract: any;
}

export const contractState = atom<Web3State>({
  key: "userInfo",
  default: {
    Provider: null,
    Contract: null,
  },
});
