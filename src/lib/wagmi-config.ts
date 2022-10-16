import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { publicProvider } from 'wagmi/providers/public'

export const needsInjectedWalletFallback =
  typeof window !== 'undefined' &&
  window.ethereum &&
  !window.ethereum.isMetaMask

const { provider, webSocketProvider } = configureChains([chain.polygonMumbai], [
  publicProvider()
])

export const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new InjectedConnector({
      options: {
        shimChainChangedDisconnect: true
      }
    })
  ]
})
