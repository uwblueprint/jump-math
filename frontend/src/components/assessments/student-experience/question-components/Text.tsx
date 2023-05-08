import React from "react";
import { Text as Typography } from "@chakra-ui/react";

const Text = ({ text }: { text: string }) => {
  return <Typography textStyle="subtitle2">{text}</Typography>;
};

export default Text;
