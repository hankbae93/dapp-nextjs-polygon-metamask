import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import "regenerator-runtime/runtime";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import TransactionProvider from "../components/TransactionProvider";

const supportedChainsIds = [80001, 1, 4];
const connectors = {
  injected: {},
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebWeb3Provider
      supportedChainsIds={supportedChainsIds}
      connectors={connectors}
    >
      <RecoilRoot>
        <TransactionProvider>
          <Component {...pageProps} />
        </TransactionProvider>
      </RecoilRoot>
    </ThirdwebWeb3Provider>
  );
}

export default MyApp;
