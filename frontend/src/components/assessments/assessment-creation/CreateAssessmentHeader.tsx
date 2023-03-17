import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  EyeOutlineIcon,
  MoreVerticalOutlineIcon,
  SaveOutlineIcon,
  TextOutlineIcon,
} from "../../../assets/icons";
import BackButton from "../../common/BackButton";

interface CreateAssessementHeaderProps {
  assessmentName: string;
  date: string;
  save: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CreateAssessementHeader = ({
  assessmentName,
  date,
  save,
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
            <Text textStyle="subtitle1">
              {assessmentName || "Untitled Assessment"}
            </Text>
            <Text textStyle="smallerParagraph"> Created {date}</Text>
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
            onClick={save}
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
