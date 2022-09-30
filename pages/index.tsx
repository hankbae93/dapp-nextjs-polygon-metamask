import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { web3State } from "../atoms/contract";
import { getReasonFromError } from "../lib/error-handler";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Home: NextPage = () => {
  const web3 = useRecoilValue(web3State);

  const session = useSession();
  const { address, connector: activeConnector, isConnected } = useAccount();

  const { connectAsync, connectors, error, isLoading, pendingConnector } =
    useConnect({
      connector: new InjectedConnector(),
    });
  const { disconnect } = useDisconnect();
  const { Contract, Signer } = web3;

  const handleLogin = async () => {
    try {
      const callbackUrl = "/";
      if (address) {
        signIn("credentials", { address, callbackUrl });
        return;
      }
      const { account } = await connectAsync();
      if (error) {
        throw error;
      }
      signIn("credentials", { address: account, callbackUrl });
    } catch (error) {
      window.alert(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      disconnect();
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
        {session.status === "authenticated" ? (
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <button onClick={handleLogin}>로그인</button>
        )}
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
