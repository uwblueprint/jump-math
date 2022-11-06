import React from "react";
import { Box, VStack } from "@chakra-ui/react";

import HomeButton from "./HomeButton";
import SidebarItem from "./SidebarItem";

import Page from "../../types/PageTypes";

interface SidebarProps {
  pages: Page[];
}

const Sidebar = ({ pages }: SidebarProps): React.ReactElement => {
  return (
    <Box
      boxShadow="base"
      pos="fixed"
      w={{ base: "full", md: 60 }}
      h="full"
      bg="white"
    >
      <HomeButton />
      <VStack alignItems="left">
        {pages.map((page, index) => (
          <SidebarItem key={index} page={page} />
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
