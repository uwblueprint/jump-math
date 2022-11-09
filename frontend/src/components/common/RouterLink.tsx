import React from "react";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import {
  Link as RouterDOMLink,
  LinkProps as RouterDOMLinkProps,
} from "react-router-dom";

type RouterLinkProps = ChakraLinkProps & RouterDOMLinkProps;

/* eslint-disable react/jsx-props-no-spreading */
const RouterLink = (props: RouterLinkProps): React.ReactElement => (
  <ChakraLink as={RouterDOMLink} {...props} />
);

export default RouterLink;
