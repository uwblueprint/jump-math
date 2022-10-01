import { extendTheme, theme as base } from "@chakra-ui/react";
import colors from "./colors"
import Button from "./components/button";

const theme = extendTheme({
  colors,
  components: {
    Button,
  },
});

export default theme;
