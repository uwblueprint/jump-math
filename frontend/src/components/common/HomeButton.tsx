import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { HOME_PAGE } from "../../constants/Routes";
import RouterLink from "./RouterLink";
import JumpMathLogo from "../../assets/jump-math-logo.png";

const HomeButton = (): React.ReactElement => {
  return (
    <Box w="200px">
      <RouterLink to={HOME_PAGE}>
        <Image src={JumpMathLogo} alt="Jump Math Logo" h="68px" />
      </RouterLink>
    </Box>
  );
};

export default HomeButton;
