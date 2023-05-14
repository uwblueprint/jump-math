import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import HomeButton from "./HomeButton";

interface HeaderProps {
  children: React.ReactChild;
}

const Header = ({ children }: HeaderProps): React.ReactElement => {
  return (
    <Box borderBottom="2px" borderColor="grey.100">
      <Flex margin="1em 2em 1em 2em">
        <HomeButton />
        {children}
      </Flex>
    </Box>
  );
};

export default Header;
