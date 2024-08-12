import { ChakraProvider } from "@chakra-ui/react";
import "./styles.css";
import theme from "../src/theme/theme";
// Supports weights 100-900
import '@fontsource-variable/inter';

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default App;
