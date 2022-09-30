import { useWeb3 } from "@3rdweb/hooks";
import { ethers } from "ethers";
import { cloneDeep } from "lodash";
import { useRecoilState } from "recoil";
import { web3State } from "../atoms/contract";

const useAccount = () => {
  const { address, chainId, connectWallet: connectWallet2 } = useWeb3();
  const [web3, setWeb3State] = useRecoilState(web3State);

  const connectWallet = async () => {
    connectWallet2("injected");
    // console.log("connectWallet called");
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider?.getSigner();
      console.log(signer);
      setWeb3State((prev) => ({
        ...prev,
        Signer: cloneDeep(signer),
      }));
    } else {
      alert("Need to Install MetaMask");
    }
  };

  return {
    connectWallet,
  };
};

export default useAccount;
