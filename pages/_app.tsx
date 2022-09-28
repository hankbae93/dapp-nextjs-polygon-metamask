import "../styles/globals.css";
import type { AppProps } from "next/app";
import Web3 from "web3";
import { useEffect } from "react";

declare let window: any;

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
