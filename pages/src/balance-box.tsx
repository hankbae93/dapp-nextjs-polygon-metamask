import { ethers } from "ethers";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const BalanceBox = () => {
  const session = useSession();
  const [balance, setBalance] = useState("0");

  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(session.data?.user.id ?? "");
    setBalance(ethers.utils.formatEther(balance));
  };

  useEffect(() => {
    if (session.status === "authenticated") getBalance();
  }, [session]);

  return <div>잔고: {balance} </div>;
};

export default BalanceBox;
