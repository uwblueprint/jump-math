import React from "react";
import { Text as ChakraText } from "@chakra-ui/react";

interface TextProps {
  text: string;
}
const Text = ({ text }: TextProps): React.ReactElement => {
  return <ChakraText textStyle="subtitle2">{text}</ChakraText>;
};

export default Text;
