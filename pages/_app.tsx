import "regenerator-runtime/runtime";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import TransactionProvider from "src/provider/TransactionProvider";

import { SessionProvider } from "next-auth/react";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import { Session } from "next-auth";

const client = createClient({
	autoConnect: true,
	provider: getDefaultProvider(),
});

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
	return (
		<WagmiConfig client={client}>
			<SessionProvider session={pageProps.session}>
				<RecoilRoot>
					<TransactionProvider>
						<Component {...pageProps} />
					</TransactionProvider>
				</RecoilRoot>
			</SessionProvider>
		</WagmiConfig>
	);
}

export default MyApp;
