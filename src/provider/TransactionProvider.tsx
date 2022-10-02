import { ethers } from "ethers";
import { cloneDeep } from "lodash";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { web3State } from "../atoms/contract";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/contract";
import { Signer, Web3Provider } from "../types/types";

declare global {
	interface Window {
		ethereum?: any;
	}
}

const TransactionProvider = ({ children }: { children?: ReactNode }) => {
	const session = useSession();
	const [web3, setWeb3] = useRecoilState(web3State);

	const updateEthers = () => {
		console.log("updateEthers called");
		if (!window.ethereum) return;
		const tempProvider = new ethers.providers.Web3Provider(window.ethereum);

		if (session.status === "authenticated") {
			const signer = tempProvider.getSigner();
			createContract(signer);
		} else {
			createContract(tempProvider);
		}
	};

	const createContract = async (providerOrSigner: Web3Provider | Signer) => {
		const tempContract = new ethers.Contract(
			CONTRACT_ADDRESS,
			CONTRACT_ABI,
			providerOrSigner
		);

		setWeb3((prev) => ({
			...prev,
			Contract: cloneDeep(tempContract),
		}));
	};

	useEffect(() => {
		if (session.status === "authenticated") updateEthers();
	}, [session]);

	return <>{children}</>;
};

export default TransactionProvider;
