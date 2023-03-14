import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";

import {
  CheckmarkCircleFillIcon,
  CheckmarkCircleOutlineIcon,
} from "../../../assets/icons";

type PasswordRequirementProps = {
  isFulfilled: boolean;
  requirement: string;
};

const PasswordRequirement = ({
  isFulfilled,
  requirement,
}: PasswordRequirementProps): React.ReactElement => {
  return (
    <HStack>
      {isFulfilled ? (
        <Box color="green.300" fontSize="20px">
          <CheckmarkCircleFillIcon />
        </Box>
      ) : (
        <Box color="red.200" fontSize="20px">
          <CheckmarkCircleOutlineIcon />
        </Box>
      )}
      <Text textStyle="mobileParagraph">{requirement}</Text>
    </HStack>
  );
};

export default PasswordRequirement;
