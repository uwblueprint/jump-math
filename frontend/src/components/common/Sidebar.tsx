import React from "react";
import { VStack } from "@chakra-ui/react";

import HomeButton from "./HomeButton";
import SidebarItem from "./SidebarItem";

import Page from "../../types/PageTypes";

interface SidebarProps {
  pages: Page[];
}

const Sidebar = ({ pages }: SidebarProps): React.ReactElement => {
  return (
    <VStack minHeight="100vh" boxShadow="base">
      <HomeButton />
      <VStack alignItems="left" w="100%">
        {pages.map((page, index) => (
          <SidebarItem key={index} page={page} />
        ))}
      </VStack>
    </VStack>
  );
};

export default Sidebar;
