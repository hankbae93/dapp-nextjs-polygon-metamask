import { useRecoilState } from "recoil";
import { web3State } from "../atoms/contract";

const useAccount = () => {
	const [_, setWeb3State] = useRecoilState(web3State);

	const connectWallet = () => {
		if (window.ethereum) {
			window.ethereum
				.request({ method: "eth_requestAccounts" })
				.then((result: any) => {
					setWeb3State((prev) => ({ ...prev, account: result[0] }));
				});
		} else {
			alert("Need to Install MetaMask");
		}
	};

	return {
		connectWallet,
	};
};

export default useAccount;
