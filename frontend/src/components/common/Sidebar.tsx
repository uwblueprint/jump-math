/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  VStack,
} from "@chakra-ui/react";
import MobileNav from "./MobileNav";
import SidebarItem from "./SidebarItem";
import Page from "../../types/PageTypes";
import HomeButton from "./HomeButton";

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
  pages: Page[];
}

interface SidebarProps extends BoxProps {
  pages: Page[];
}

const SidebarContent = ({ pages, ...rest }: SidebarContentProps) => {
  return (
    <Box
      boxShadow="base"
      pos="fixed"
      w={{ base: "full", md: 60 }}
      h="full"
      bg="white"
      {...rest}
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

const Sidebar = ({ pages }: SidebarProps): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SidebarContent
        display={{ base: "none", md: "block" }}
        onClose={() => onClose}
        pages={pages}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} pages={pages} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
    </Box>
  );
};

export default Sidebar;
