import { ethers } from "ethers";
import { cloneDeep } from "lodash";
import React, { ReactNode, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { web3State } from "../atoms/contract";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/contract";
import { Signer, Web3Provider } from "../types";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [web3, setWeb3] = useRecoilState(web3State);

  const updateEthers = () => {
    console.log("updateEthers called");
    if (!window.ethereum) return;
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    if (web3.Signer) {
      console.log("if web3.Signer");
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
    updateEthers();
  }, [web3.Signer]);

  useEffect(() => {
    console.log({ web3 });
  }, [web3]);

  return <>{children}</>;
};

export default TransactionProvider;
