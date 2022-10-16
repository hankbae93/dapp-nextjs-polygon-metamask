import "regenerator-runtime/runtime";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { SessionProvider } from "next-auth/react";
import { WagmiConfig } from "wagmi";

import { Session } from "next-auth";
import { wagmiClient } from "src/lib/wagmi-config";
import AppLayout from "src/layout";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
	return (
		<WagmiConfig client={wagmiClient}>
			<SessionProvider session={pageProps.session}>
				<RecoilRoot>
          <AppLayout>
					<Component {...pageProps} />
          </AppLayout>
				</RecoilRoot>
			</SessionProvider>
		</WagmiConfig>
	);
}

export default MyApp;
