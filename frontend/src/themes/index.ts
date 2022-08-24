import { extendTheme, theme as base } from "@chakra-ui/react";
import colors from "./colors"
import Button from "./components/button";
import textStyles from './typography'
const theme = extendTheme({
  colors,
  textStyles: {...textStyles},
  components: {
    Button,
  },
});

export default theme;
