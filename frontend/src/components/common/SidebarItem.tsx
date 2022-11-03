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
}

interface UpperSidebarItemProps extends FlexProps {
  text: ReactText;
  url: string;
  subPages?: LinkItemProps[];
}

export const LowerSidebarItem = ({ name, url }: LinkItemProps) => {
  return (
    <RouterLink
      to={url}
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
          bg: "blue.50",
          color: "black",
        }}
      >
        {name}
      </Flex>
    </RouterLink>
  );
};

const SidebarItem = ({
  showMore,
  setShowMore,
  text,
  url,
  existSubPage,
}: SidebarItemProps) => {
  return (
    <RouterLink to={url} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        mx="6"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "blue.50",
          color: "black",
        }}
      >
        <Box p={2}>
          <BookIcon />
        </Box>
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

export const UpperSidebarItem = ({
  text,
  url,
  subPages,
}: UpperSidebarItemProps) => {
  const [showMore, setShowMore] = useState(false);
  let existSubPage;
  let displaySub;
  if (subPages) {
    existSubPage = true;
    displaySub = subPages.map((page) => (
      <LowerSidebarItem key={page.name} name={page.name} url={page.url} />
    ));
  } else {
    displaySub = null;
    existSubPage = false;
  }

  return (
    <>
      <SidebarItem
        showMore={showMore}
        setShowMore={setShowMore}
        key={text}
        text={text}
        url={url}
        existSubPage={existSubPage}
      >
        {text}
      </SidebarItem>
      {showMore && displaySub}
    </>
  );
};

export default SidebarItem;
