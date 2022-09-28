import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { Contract, ethers, Signer } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/contract";

const Home: NextPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [defaultAccount, setDefaultAccount] = useState<string | null>(null);
	const [connButtonText, setConnButtonText] = useState("Connect Wallet");

	const [provider, setProvider] =
		useState<ethers.providers.Web3Provider | null>(null);
	const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
		null
	);
	const [contract, setContract] = useState<Contract | null>(null);

	const connectWallet = () => {
		if (window.ethereum) {
			window.ethereum
				.request({ method: "eth_requestAccounts" })
				.then((result: any) => {
					changedAccount(result[0]);
				});
		} else {
			setErrorMessage("Need to Install MetaMask");
		}
	};

	const changedAccount = (newAccount: string) => {
		setDefaultAccount(newAccount);
		updateEthers();
	};

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(
			CONTRACT_ADDRESS,
			CONTRACT_ABI,
			tempSigner
		);
		setContract(tempContract);
	};

	const call = async () => {
		if (!contract) return;
		const response = await contract.test1();
		console.log({ call: response });
	};
	const send = async () => {
		if (!contract) return;
		const response = await contract.setA(1);
		console.log({ sendA: response });
	};

	useEffect(() => {
		// const provider = new ethers.providers.Web3Provider(window.ethereum);
		// const signer = new Signer.connect(provider);
		// console.log(provider);
	}, []);

	return (
		<div>
			<div>
				<button onClick={connectWallet}>{connButtonText || "로그인"}</button>
			</div>
			<div>
				<button onClick={call}>call</button>

				<button onClick={send}>send</button>
			</div>
		</div>
	);
};

export default Home;
