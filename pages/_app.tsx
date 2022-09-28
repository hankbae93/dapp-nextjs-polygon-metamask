import "../styles/globals.css";
import type { AppProps } from "next/app";
import Web3 from "web3";
import { useEffect } from "react";

declare let window: any;

function MyApp({ Component, pageProps }: AppProps) {
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "No compatible wallet detected. Please install the Metamask browser extension to continue."
      );
    }
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
