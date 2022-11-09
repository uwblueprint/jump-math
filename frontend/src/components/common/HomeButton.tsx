import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import { HOME_PAGE } from "../../constants/Routes";
import RouterLink from "./RouterLink";
import JumpMathLogo from "../../assets/jump-math-logo.png";

const HomeButton = (): React.ReactElement => {
  return (
    <Flex
      h="20"
      alignItems="center"
      mx="8"
      justifyContent="space-between"
      mt="16"
      mb="10"
    >
      <RouterLink to={HOME_PAGE}>
        <Image src={JumpMathLogo} alt="Jump Math Logo" h="68px" />
      </RouterLink>
    </Flex>
  );
};

export default HomeButton;
