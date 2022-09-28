import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import TransactionProvider from "../components/TransactionProvider";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<TransactionProvider>
				<Component {...pageProps} />
			</TransactionProvider>
		</RecoilRoot>
	);
}

export default MyApp;
