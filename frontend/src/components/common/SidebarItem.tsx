import React, { useState } from "react";
import { Flex, Box, Text, Spacer, FlexProps } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import RouterLink from "./RouterLink";
import { ChevronUpIcon, ChevronDownIcon } from "../../assets/icons";
import Page from "../../types/PageTypes";

interface SidebarItemProps extends FlexProps {
  page: Page;
  isSubPage?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  page,
  isSubPage = false,
}: SidebarItemProps) => {
  const { title, url, subPages } = page;
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const isCurrentPage = location.pathname.includes(url);
  const activePage = {
    color: "blue.300",
    fontWeight: "bold",
  };

  const children = subPages
    ? subPages.map((subPage, index) => (
        <SidebarItem key={index} page={subPage} isSubPage />
      ))
    : null;

  return (
    <RouterLink
      to={url}
      onMouseEnter={() => setShowMore(true)}
      onMouseLeave={() => setShowMore(false)}
      style={{ textDecoration: "none" }}
    >
      <Flex
        align="center"
        mx="4"
        role="group"
        cursor="pointer"
        _hover={activePage}
      >
        <Text fontSize="14px" sx={isCurrentPage ? activePage : undefined}>
          {title}
        </Text>
        <Spacer />
        <Box m={2}>
          {children && (showMore ? <ChevronUpIcon /> : <ChevronDownIcon />)}
        </Box>
      </Flex>
    </RouterLink>
  );
};

export default SidebarItem;
