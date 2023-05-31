import React from "react";
import { Image as ChakraImage } from "@chakra-ui/react";

interface ImageProps {
  url: string;
}
const Image = ({ url }: ImageProps): React.ReactElement => {
  return <ChakraImage m="auto" maxHeight="50vh" src={url} />;
};

export default Image;
