import React from "react";
import { Flex, HStack, Spacer, Box } from "@chakra-ui/react";

import HomeButton from "./HomeButton";
import NavbarItem from "./NavbarItem";

import Page from "../../types/PageTypes";

interface NavbarProps {
  pages: Page[];
}

const Navbar = ({ pages }: NavbarProps): React.ReactElement => {
  return (
    <Box borderBottom="2px" borderColor="grey.100">
      <Flex margin="1em 2em 1em 2em">
        <HomeButton />
        <Spacer />
        <HStack>
          {pages.map((page, index) => (
            <NavbarItem key={index} page={page} />
          ))}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
