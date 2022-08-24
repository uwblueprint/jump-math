import { extendTheme, theme as base } from "@chakra-ui/react";
import colors from "./colors"
import textStyles from './typography'
const theme = extendTheme({
  colors,
  textStyles: {...textStyles},
});

export default theme;
