import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import "./styles.css";
import theme from "../src/theme/theme";
// Supports weights 100-900
import "@fontsource-variable/inter";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { Provider } from "react-redux";
import { store } from "../src/services/store";

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const baseMainnet = {
  chainId: 8453,
  name: "Base",
  currency: "ETH",
  explorerUrl: "https://basescan.org",
  rpcUrl: "https://mainnet.base.org",
};

// 3. Create a metadata object
const metadata = {
  name: "ColdReach",
  description:
    "ColdReach is a decentralized platform for user to generate neat DMs for their clients.",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  auth: {
    email: true,
    socials: ["google", "x", "github", "discord", "farcaster"],
    showWallets: true,
    walletFeatures: true,
  },
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: "...",
  defaultChainId: 1,
  coinbasePreference: "smartWalletOnly",
});

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  chains: [baseMainnet],
  projectId,
  enableSwaps: true,
  enableOnramp: true,
  enableAnalytics: true,
});

function App({ Component, pageProps }) {
  
  return (
    <ChakraProvider theme={theme} cssVarsRoot="body">
     <Provider store={store}>
     <Component {...pageProps} />
     </Provider>
    </ChakraProvider>
  );
}
export default App;
