import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import HomeButton from "./HomeButton";

interface HeaderWrapperProps {
  content: React.ReactElement;
}

const HeaderWrapper = ({ content }: HeaderWrapperProps): React.ReactElement => {
  return (
    <Box borderBottom="2px" borderColor="grey.100">
      <Flex margin="1em 2em 1em 2em">
        <HomeButton />
        {content}
      </Flex>
    </Box>
  );
};

export default HeaderWrapper;
