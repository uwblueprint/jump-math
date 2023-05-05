import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import HomeButton from "./HomeButton";

interface HeaderWrapperProps {
  children: React.ReactChild;
}

const HeaderWrapper = ({
  children,
}: HeaderWrapperProps): React.ReactElement => {
  return (
    <Box borderBottom="2px" borderColor="grey.100">
      <Flex margin="1em 2em 1em 2em">
        <HomeButton />
        {children}
      </Flex>
    </Box>
  );
};

export default HeaderWrapper;
