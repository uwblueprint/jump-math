import React from "react";
import { Flex, HStack, Spacer, Box } from "@chakra-ui/react";

import HomeButton from "./HomeButton";
import SidebarItem from "./SidebarItem";

import Page from "../../types/PageTypes";

interface SidebarProps {
  pages: Page[];
}

const Sidebar = ({ pages }: SidebarProps): React.ReactElement => {
  return (
    <Box borderBottom="2px" borderColor="grey.100">
      <Flex margin="1em 2em 1em 2em">
        <HomeButton />
        <Spacer />
        <HStack>
          {pages.map((page, index) => (
            <SidebarItem key={index} page={page} />
          ))}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Sidebar;
