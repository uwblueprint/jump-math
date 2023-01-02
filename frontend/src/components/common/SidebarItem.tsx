import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Spacer,
  FlexProps,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
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
        <Box key={index} m={2}>
          <SidebarItem page={subPage} isSubPage />
        </Box>
      ))
    : null;

  return (
    <Popover trigger="hover" placement="bottom-start">
      <PopoverTrigger>
        <Box>
          <RouterLink
            to={url}
            style={{ textDecoration: "none" }}
            onMouseEnter={() => setShowMore(true)}
            onMouseLeave={() => setShowMore(false)}
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
                {children &&
                  (showMore ? <ChevronDownIcon /> : <ChevronUpIcon />)}
              </Box>
            </Flex>
          </RouterLink>
        </Box>
      </PopoverTrigger>
      {children && (
        <PopoverContent
          border="1px"
          borderColor="grey.100"
          borderRadius={0}
          p={2}
          width="auto"
        >
          {children}
        </PopoverContent>
      )}
    </Popover>
  );
};

export default SidebarItem;
