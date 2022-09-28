import { ethers } from "ethers";

declare let window: any;

const ethereum = new ethers.providers.Web3Provider(window.ethereum);

export default ethereum;
