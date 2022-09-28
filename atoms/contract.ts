import { Contract } from "ethers";
import { atom } from "recoil";

interface Web3State {
	Provider: any;
	Contract: Contract | null;
	account: string;
}

export const web3State = atom<Web3State>({
	key: "web3",
	default: {
		Provider: null,
		Contract: null,
		account: "",
	},
});
