import React from "react";
import type { LinkProps as RouterDOMLinkProps } from "react-router-dom";
import { Link as RouterDOMLink } from "react-router-dom";
import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";

type RouterLinkProps = ChakraLinkProps & RouterDOMLinkProps;

const RouterLink = (props: RouterLinkProps): React.ReactElement => (
  <ChakraLink as={RouterDOMLink} {...props} />
);

export default RouterLink;
