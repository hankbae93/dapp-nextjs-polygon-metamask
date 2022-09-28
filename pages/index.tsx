import type { NextPage } from "next";
import { useState } from "react";
import useAccount from "../hooks/useAccount";
import { useRecoilValue } from "recoil";
import { web3State } from "../atoms/contract";

const Home: NextPage = () => {
	const web3 = useRecoilValue(web3State);
	const [connButtonText, setConnButtonText] = useState("Connect Wallet");
	const { connectWallet } = useAccount();

	const call = async () => {
		if (!web3.Contract) return;
		const response = await web3.Contract.test1();
		console.log({ call: response });
	};
	const send = async () => {
		if (!web3.Contract) return;
		const response = await web3.Contract.setA(1);
		console.log({ sendA: response });
	};

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
