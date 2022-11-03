/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  Box,
  CloseButton,
  Flex,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  Image,
  VStack,
} from "@chakra-ui/react";
import RouterLink from "./RouterLink";
import MobileNav from "./MobileNav";
import SidebarItem, { UpperSidebarItem, LowerSidebarItem } from "./SidebarItem";
import { HOME_PAGE } from "../../constants/Routes";
import JumpMathLogo from "../../assets/jump-math-logo.png";
import LinkItemProps, { LinkItemArrayProps } from "./LinkTypes";

const HomeButton = (): React.ReactElement => {
  return (
    <Flex
      h="20"
      alignItems="center"
      mx="8"
      justifyContent="space-between"
      mt="16"
      mb="10"
    >
      <RouterLink to={HOME_PAGE}>
        <Image src={JumpMathLogo} alt="Jump Math Logo" h="68px" />
      </RouterLink>
    </Flex>
  );
};

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
