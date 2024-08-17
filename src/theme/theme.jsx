import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#eee", "#17171D")(props),
      color: mode("blackAlpha.800", "whiteAlpha.800")(props),
    },
  }),
};

const colors = {
  brand: {
    100: "#",
    200: "#",
    300: "#",
    400: "#",
    500: "",
    600: "",
    700: "",
    800: "",
    900: "",
  },
};

const fonts = {
  heading: `'Inter Variable', sans-serif`,
  body: `'Inter Variable', sans-serif`,
};

const components = {
  Button: {},
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles, colors, fonts, components });
export default theme;
