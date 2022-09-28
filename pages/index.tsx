import { Contract, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Hank from "../contracts/Hank.json";

declare let window: any;

const Home: NextPage = () => {
  const [account, setAccount] = useState<string | undefined>();
  const [contract, setContract] = useState<Contract>();
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log({ accounts });
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const loadBlockchainData = async () => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();

    // if (!signer) return alert("DD");

    // const contract = new ethers.Contract(
    // "0xd96fF3bA3EAC33A784622B65dB7f7aF614953782",
    // [
    //   {
    //     inputs: [],
    //     name: "InvalidA",
    //     type: "error",
    //   },
    //   {
    //     anonymous: false,
    //     inputs: [
    //       {
    //         indexed: false,
    //         internalType: "uint256",
    //         name: "a",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "ChangeA",
    //     type: "event",
    //   },
    //   {
    //     inputs: [
    //       {
    //         internalType: "uint256",
    //         name: "_a",
    //         type: "uint256",
    //       },
    //     ],
    //     name: "setA",
    //     outputs: [],
    //     stateMutability: "nonpayable",
    //     type: "function",
    //   },
    //   {
    //     inputs: [],
    //     name: "test1",
    //     outputs: [
    //       {
    //         internalType: "uint256",
    //         name: "",
    //         type: "uint256",
    //       },
    //     ],
    //     stateMutability: "view",
    //     type: "function",
    //   },
    // ],
    //   provider
    // );
    // console.log({ contract });
    // setContract(contract);

    const myContractInstance = new window.web3.eth.Contract(
      [
        {
          inputs: [],
          name: "InvalidA",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "a",
              type: "uint256",
            },
          ],
          name: "ChangeA",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_a",
              type: "uint256",
            },
          ],
          name: "setA",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "test1",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      "0xd96fF3bA3EAC33A784622B65dB7f7aF614953782"
    );

    try {
      console.time("call test");
      const b = await myContractInstance.methods.test1().call({
        from: account,
      });
      console.log(b);
      console.timeEnd("call test");

      console.time("send test");
      const a = await myContractInstance.methods.setA(12).send({
        from: account,
      });
      console.log({ a });
      console.timeEnd("send test");
      // const a = await contract.connect(signer).setA(100);
      // const a = await contract.connect(signer).setA("105", { gas: 2100000 });
      // const receipt = await a.wait();
      // console.log(receipt);
      // console.log({ a });
      // const b = await contract.test1();
      // console.log({ b });
    } catch (err) {
      console.error(err);
    }
    // if (networkData) {
    //   var tempContract = new web3.eth.Contract(
    //     Decentragram.abi,
    //     networkData.address
    //   );
    //   setContract(tempContract);
    //   var count = await tempContract.methods.imageCount().call();
    //   setImageCount(count);
    //   var tempImageList = [];
    //   for (var i = 1; i <= count; i++) {
    //     const image = await tempContract.methods.images(i).call();
    //     tempImageList.push(image);
    //   }
    //   tempImageList.reverse();
    //   setImages(tempImageList);
    // } else {
    //   window.alert("TestNet not found");
    // }
    // setLoading(false);
  };

  useEffect(() => {
    // loadBlockchainData();
  }, []);

  return (
    <div>
      <button onClick={connectWallet}>로그인</button>
      <button onClick={loadBlockchainData}>aa</button>
    </div>
  );
};

export default Home;
