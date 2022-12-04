import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import Alert from "./components/alert";
import Button from "./components/button";
import Form from "./components/form";
import FormError from "./components/formError";
import Input from "./components/input";
import Radio from "./components/radio";
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
    Alert,
    Button,
    Form,
    FormError,
    Input,
    Radio,
  },
});

export default theme;
