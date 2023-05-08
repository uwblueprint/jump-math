import React from "react";
import { Image as Img } from "@chakra-ui/react";

const Image = ({ url }: { url: string }) => {
  return <Img m="auto" maxHeight="50vh" src={url} />;
};

export default Image;
