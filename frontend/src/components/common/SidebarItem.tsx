import React, { useState } from "react";
import { Flex, Box, Text, Spacer, FlexProps } from "@chakra-ui/react";
import RouterLink from "./RouterLink";
import { ChevronUpIcon, ChevronDownIcon, BookIcon } from "./icons";
import LinkItemProps from "./LinkTypes";

interface SidebarItemProps extends FlexProps {
  page: LinkItemProps;
  isSubPage?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  page,
  isSubPage = false,
}: SidebarItemProps) => {
  const [showMore, setShowMore] = useState(false);
  const { name, url, subPages } = page;

  let children = null;
  if (subPages) {
    children = subPages.map((subPage, index) => (
      <SidebarItem key={index} page={subPage} isSubPage />
    ));
  }

  return (
    <>
      <RouterLink to={url} style={{ textDecoration: "none" }}>
        <Flex
          align="center"
          p={isSubPage ? "2" : undefined}
          pl={isSubPage ? "8" : undefined}
          mx="4"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "blue.50",
            color: "black",
          }}
        >
          <Box p={2}>{!isSubPage && <BookIcon />}</Box>
          <Text fontSize="14px">{name}</Text>
          <Spacer />
          <Box
            onClick={(e) => {
              e.preventDefault();
              setShowMore(!showMore);
            }}
            m={2}
          >
            {subPages && (showMore ? <ChevronDownIcon /> : <ChevronUpIcon />)}
          </Box>
        </Flex>
      </RouterLink>
      {showMore && children}
    </>
  );
};

export default SidebarItem;
