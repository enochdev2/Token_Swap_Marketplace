import '../styles/globals.css'

import merge from "lodash.merge"
import '@rainbow-me/rainbowkit/styles.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId:  projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: false,
});

const client = new QueryClient();





function MyApp({ Component, pageProps }) {
  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={client}>
      <RainbowKitProvider>
   <Component {...pageProps} />
   </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider> 
  );
}

export default MyApp;



// import 
// { getDefaultWallets, 
//   RainbowKitProvider,
// darkTheme,
//  midnightTheme
//  } from '@rainbow-me/rainbowkit';

//  import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
//  import { infuraProvider } from 'wagmi/providers/infura';

// const {chains, provider} = configureChains(
//   [chain.polygonMumbai],
//   [
//     infuraProvider({
//       apiKey: "f0267a8d7d5642caa8735db507eefd",
//       priority: 1,
//     }),
//   ]
// );

// const {connectors} = getDefaultWallets({
//   appName: "Custom Dex",
//   chains,
// });

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
// });

// const myTheme = merge(midnightTheme(), {
//   colors: {
//     accentColor: "#18181b",
//     accentColorForeground: "#fff",
//   },
// });
