import "regenerator-runtime/runtime";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import TransactionProvider from "src/provider/TransactionProvider";

import { SessionProvider } from "next-auth/react";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import { Session } from "next-auth";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
  ],
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
