import React from "react";
import { Box, Flex, HStack, Spacer } from "@chakra-ui/react";

import Page from "../../types/PageTypes";
import Logout from "../auth/Logout";

import HomeButton from "./HomeButton";
import NavbarItem from "./NavbarItem";

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
          <Logout />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
