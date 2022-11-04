/* eslint-disable react/jsx-props-no-spreading */

import React, { ReactText, useState } from "react";
import { Flex, Box, Text, Spacer, FlexProps } from "@chakra-ui/react";
import RouterLink from "./RouterLink";
import { ChevronUpIcon, ChevronDownIcon, BookIcon } from "./icons";
import LinkItemProps from "./LinkTypes";

interface SidebarItemProps extends FlexProps {
  text: ReactText;
  url: string;
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
  showMore: boolean;
  existSubPage: boolean;
  isSubPage: boolean;
}

interface PageItemProps extends FlexProps {
  name: ReactText;
  url: string;
  subPages?: LinkItemProps[];
  isSubPage?: boolean;
}

const SidebarItem = ({
  showMore,
  setShowMore,
  text,
  url,
  existSubPage,
  isSubPage,
}: SidebarItemProps) => {
  return (
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
        <Text fontSize="14px">{text}</Text>
        <Spacer />
        <Box
          onClick={(e) => {
            e.preventDefault();
            setShowMore(!showMore);
          }}
          m={2}
        >
          {existSubPage && (showMore ? <ChevronDownIcon /> : <ChevronUpIcon />)}
        </Box>
      </Flex>
    </RouterLink>
  );
};

export const PageItem = ({
  name,
  url,
  subPages,
  isSubPage = false,
}: PageItemProps) => {
  let displaySub = null;
  if (subPages) {
    displaySub = subPages.map((subPage) => (
      <PageItem key={1} name={subPage.name} url={subPage.url} isSubPage />
    ));
  }

  let existSubPage = false;
  if (subPages) {
    existSubPage = true;
  }
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <SidebarItem
        showMore={showMore}
        setShowMore={setShowMore}
        key={name}
        text={name}
        url={url}
        existSubPage={existSubPage}
        isSubPage={isSubPage}
      >
        {name}
      </SidebarItem>
      {showMore && displaySub}
    </>
  );
};

export default SidebarItem;
