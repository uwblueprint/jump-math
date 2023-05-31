import React from "react";
import { Box, Image } from "@chakra-ui/react";

import { JUMP_MATH_LOGO } from "../../../assets/images";
import { HOME_PAGE } from "../../../constants/Routes";

import RouterLink from "./RouterLink";

const HomeButton = (): React.ReactElement => {
  return (
    <Box w="200px">
      <RouterLink to={HOME_PAGE}>
        <Image
          alt={JUMP_MATH_LOGO.alt}
          h="68px"
          objectFit="contain"
          objectPosition="center"
          src={JUMP_MATH_LOGO.src}
        />
      </RouterLink>
    </Box>
  );
};

export default HomeButton;
