import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import Button from "./components/button";
import textStyles from "./typography";
import "@fontsource/dm-sans";

const theme = extendTheme({
  fonts: {
    heading: "'DM Sans', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  colors,
  textStyles: { ...textStyles },
  components: {
    Button,
  },
});

export default theme;
