import { ethers } from "ethers";
import { cloneDeep } from "lodash";
import React, { ReactNode, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { web3State } from "../atoms/contract";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/contract";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );
  const [web3, setWeb3] = useRecoilState(web3State);

  const updateEthers = () => {
    if (!window.ethereum) return;
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);
  };

  const createContract = async () => {
    await provider?.send("eth_requestAccounts", []);
    const signer = provider?.getSigner() as ethers.providers.JsonRpcSigner;
    const tempContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    setWeb3((prev) => ({
      ...prev,
      Contract: cloneDeep(tempContract),
    }));
  };

  useEffect(() => {
    updateEthers();
  }, []);

  useEffect(() => {
    createContract();
  }, [provider]);

  return <>{children}</>;
};

export default TransactionProvider;
