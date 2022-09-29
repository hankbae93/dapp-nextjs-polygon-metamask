import { ethers } from "ethers";
import { useRecoilState } from "recoil";
import { web3State } from "../atoms/contract";

const useAccount = () => {
  const [web3, setWeb3State] = useRecoilState(web3State);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider?.getSigner();

      return signer;

      // setWeb3State((prev) => ({
      //   ...prev,
      //   Signer: signer,
      // }));
    } else {
      alert("Need to Install MetaMask");
    }
  };

  return {
    connectWallet,
  };
};

export default useAccount;
