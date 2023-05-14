import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  FlexProps,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { ChevronDownIcon, ChevronUpIcon } from "../../../assets/icons";
import Page from "../../../types/PageTypes";
import RouterLink from "../RouterLink";

interface NavbarItemProps extends FlexProps {
  page: Page;
}

export const activePage = {
  color: "blue.300",
  fontWeight: "bold",
};

const NavbarItem: React.FC<NavbarItemProps> = ({ page }: NavbarItemProps) => {
  const { title, url, subPages } = page;
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const isCurrentPage = location.pathname.includes(url);

  const children = subPages
    ? subPages.map((subPage, index) => (
        <Box key={index} m={2}>
          <NavbarItem page={subPage} />
        </Box>
      ))
    : null;

  return (
    <Popover placement="bottom-start" trigger="hover">
      <PopoverTrigger>
        <Box>
          <RouterLink
            onMouseEnter={() => setShowMore(true)}
            onMouseLeave={() => setShowMore(false)}
            style={{ textDecoration: "none" }}
            to={url}
          >
            <Flex _hover={activePage} align="center" cursor="pointer" mx="4">
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

export default NavbarItem;
