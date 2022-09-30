import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { web3State } from "../atoms/contract";
import { getReasonFromError } from "../lib/error-handler";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Home: NextPage = () => {
  const web3 = useRecoilValue(web3State);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const session = useSession();
  const { address, connector: activeConnector, isConnected } = useAccount();

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      connector: new InjectedConnector(),
    });
  const { disconnect } = useDisconnect();
  const { Contract, Signer } = web3;

  const handleLogin = async () => {
    try {
      const callbackUrl = "/";
      if (!isConnected) {
        connect();
      }

      console.log({ activeConnector, address });

      signIn("credentials", {
        address,
        callbackUrl,
        redirect: error ? false : true,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  const call = async () => {
    if (!Signer || !Contract) return;
    const response = await Contract.test1().catch((error: Error) => {
      // console.error(error);
      const ERROR = getReasonFromError(error, Contract.interface);
      console.log(ERROR);
    });

    console.log({ call: response });
  };

  const send = async () => {
    if (!Signer || !Contract) return;
    const response = await Contract.setA(2).catch((error: Error) => {
      const ERROR = getReasonFromError(error, Contract.interface);
      console.log(ERROR);
    });
    console.log({ sendA: response });
  };

  useEffect(() => {
    console.log({ session });
  }, [session]);

  return (
    <div>
      <div>
        <button onClick={handleLogin}>{connButtonText || "로그인"}</button>
      </div>
      <div>
        <button onClick={call}>call</button>

        <button onClick={send}>send</button>
      </div>
      <div>
        {/* <p>address: {address}</p> */}
        <p>chainId: </p>
      </div>
    </div>
  );
};

export default Home;
