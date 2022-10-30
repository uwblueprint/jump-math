/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactText, useState } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Spacer,
  Image,
  VStack,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon, BookIcon } from "./icons";
import RouterLink from "./RouterLink";
import MobileNav from "./MobileNav";
import { HOME_PAGE } from "../../constants/Routes";
import JumpMathLogo from "../../assets/jump-math-logo.png";

export interface LinkItemProps {
  name: string;
  urlLink: string;
  // eslint-disable-next-line react/no-unused-prop-types
  subPages?: LinkItemProps[];
}

export interface LinkItemArrayProps {
  linkItems: LinkItemProps[];
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  linkItems: LinkItemProps[];
}

interface NavItemProps extends FlexProps {
  navText: ReactText;
  urlLink: string;
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
  showMore: boolean;
  existSubPage: boolean;
}

interface UpperNavItemProps extends FlexProps {
  navText: ReactText;
  urlLink: string;
  subPages?: LinkItemProps[];
}
const LowerNavItem = ({ name, urlLink }: LinkItemProps) => {
  return (
    <RouterLink
      to={urlLink}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        pl="8"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.400",
          color: "black",
        }}
      >
        {name}
      </Flex>
    </RouterLink>
  );
};

const NavItem = ({
  showMore,
  setShowMore,
  navText,
  urlLink,
  existSubPage,
}: NavItemProps) => {
  return (
    <RouterLink
      to={urlLink}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.400",
          color: "black",
        }}
      >
        <Box p={1}>
          <BookIcon />
        </Box>
        <Box>{navText}</Box>
        <Spacer />
        <Box
          onClick={(e) => {
            e.preventDefault();
            setShowMore(!showMore);
          }}
        >
          {existSubPage && (showMore ? <ChevronUpIcon /> : <ChevronDownIcon />)}
        </Box>
      </Flex>
    </RouterLink>
  );
};

const UpperNavItem = ({ navText, urlLink, subPages }: UpperNavItemProps) => {
  const [showMore, setShowMore] = useState(false);
  let existSubPage;
  let displaySub;
  if (subPages) {
    existSubPage = true;
    displaySub = subPages.map((page) => (
      <LowerNavItem key={page.name} name={page.name} urlLink={page.urlLink} />
    ));
  } else {
    displaySub = null;
    existSubPage = false;
  }

  return (
    <>
      <NavItem
        showMore={showMore}
        setShowMore={setShowMore}
        key={navText}
        navText={navText}
        urlLink={urlLink}
        existSubPage={existSubPage}
      >
        {navText}
      </NavItem>
      {showMore && displaySub}
    </>
  );
};

const SidebarContent = ({ linkItems, ...rest }: SidebarProps) => {
  return (
    <Box
      boxShadow="base"
      pos="fixed"
      w={{ base: "full", md: 60 }}
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        mt="16"
        mb="6"
      >
        <RouterLink to={HOME_PAGE}>
          <Image src={JumpMathLogo} alt="Jump Math Logo" h="64px" />
        </RouterLink>
      </Flex>
      <VStack alignItems="left">
        {linkItems.map((link) => (
          <UpperNavItem
            key={link.name}
            navText={link.name}
            urlLink={link.urlLink}
            subPages={link.subPages}
          >
            {link.name}
            {link.subPages}
          </UpperNavItem>
        ))}
      </VStack>
    </Box>
  );
};

const NavigationBar = ({
  linkItems,
}: LinkItemArrayProps): React.ReactElement => {
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

export default NavigationBar;
