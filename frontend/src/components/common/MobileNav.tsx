import React from "react";
import {
  IconButton,
  Flex,
  Text,
  FlexProps,
  useColorModeValue,
} from "@chakra-ui/react";

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

/* eslint-disable react/jsx-props-no-spreading */
// TODO: @joyce: come back to this
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};

export default MobileNav;
