import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import "./styles.css";
import theme from "../src/theme/theme";
// Supports weights 100-900
import "@fontsource-variable/inter";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

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
  currency: "ETH", // Base uses ETH as its native currency
  explorerUrl: "https://basescan.org", // Similar to Etherscan, but for Base network
  rpcUrl: "https://mainnet.base.org", // Official RPC URL for Base Mainnet
};

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  auth: {
    email: true,
    socials: ["google", "x", "github", "discord", "farcaster"], // add social logins
    showWallets: true,
    walletFeatures: false,
  },
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  chains: [baseMainnet],
  projectId,
  enableSwaps: false, // true by default
  enableOnramp: false, // true by default
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default App;
