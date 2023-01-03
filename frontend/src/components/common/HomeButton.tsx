import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { HOME_PAGE } from "../../constants/Routes";
import { JUMP_MATH_LOGO } from "../../assets/images";
import RouterLink from "./RouterLink";

const HomeButton = (): React.ReactElement => {
  return (
    <Box w="200px">
      <RouterLink to={HOME_PAGE}>
        <Image src={JUMP_MATH_LOGO.src} alt={JUMP_MATH_LOGO.alt} h="68px" />
      </RouterLink>
    </Box>
  );
};

export default HomeButton;
