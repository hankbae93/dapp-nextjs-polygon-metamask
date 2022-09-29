import type { NextPage } from "next";
import { useState } from "react";
import useAccount from "../hooks/useAccount";
import { useRecoilValue } from "recoil";
import { web3State } from "../atoms/contract";

const Home: NextPage = () => {
  const web3 = useRecoilValue(web3State);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const { connectWallet } = useAccount();

  const { Contract, Signer } = web3;

  const call = async () => {
    if (!Signer || !Contract) return;
    const response = await Contract.test1().catch((error: Error) => {
      console.error(error);
    });
    console.log({ call: response });
  };

  const send = async () => {
    if (!Signer || !Contract) return;
    const response = await Contract.setA(1).catch((error: Error) => {
      console.error(error);
    });
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
