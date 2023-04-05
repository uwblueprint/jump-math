import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  EyeOutlineIcon,
  SaveOutlineIcon,
  TextOutlineIcon,
} from "../../../assets/icons";
import { getReadableDate } from "../../../utils/GeneralUtils";
import BackButton from "../../common/BackButton";

interface CreateAssessementHeaderProps {
  name: string;
  onSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CreateAssessementHeader = ({
  name,
  onSave,
}: CreateAssessementHeaderProps): React.ReactElement => {
  return (
    <Box
      borderBottom="1px"
      borderBottomColor="grey.200"
      padding="1.5em 2em 1.5em 2em"
      width="100%"
    >
      <Flex minWidth="max-content">
        <HStack alignItems="start" spacing={6}>
          <BackButton />
          <VStack align="left">
            <Text textStyle="subtitle1">{name || "Untitled Assessment"}</Text>
            <Text textStyle="smallerParagraph">
              Created {getReadableDate()}
            </Text>
          </VStack>
        </HStack>
        <Spacer />
        <HStack spacing={2}>
          <Button leftIcon={<EyeOutlineIcon />} size="sm" variant="tertiary">
            Preview
          </Button>
          <Button
            leftIcon={<SaveOutlineIcon />}
            minWidth="10"
            onClick={onSave}
            variant="secondary"
          >
            Save
          </Button>
          <Button
            leftIcon={<TextOutlineIcon />}
            minWidth="10"
            variant="primary"
          >
            Publish
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default CreateAssessementHeader;
