/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  VStack,
} from "@chakra-ui/react";
import RouterLink from "./RouterLink";
import MobileNav from "./MobileNav";
import SidebarItem, { UpperSidebarItem, LowerSidebarItem } from "./SidebarItem";
import LinkItemProps, { LinkItemArrayProps } from "./LinkTypes";
import HomeButton from "./HomeButton";

interface SidebarProps extends BoxProps {
  onClose: () => void;
  linkItems: LinkItemProps[];
}

const SidebarContent = ({ linkItems, ...rest }: SidebarProps) => {
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
        {linkItems.map((link) => (
          <UpperSidebarItem
            key={link.name}
            text={link.name}
            url={link.url}
            subPages={link.subPages}
          />
        ))}
      </VStack>
    </Box>
  );
};

const Sidebar = ({ linkItems }: LinkItemArrayProps): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SidebarContent
        display={{ base: "none", md: "block" }}
        onClose={() => onClose}
        linkItems={linkItems}
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
          <SidebarContent onClose={onClose} linkItems={linkItems} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
    </Box>
  );
};

export default Sidebar;
