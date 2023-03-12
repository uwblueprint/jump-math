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
  ArrowBackOutlineIcon,
  EyeOutlineIcon,
  MoreVerticalOutlineIcon,
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
      padding="1.5em 2em 1.5em 2em"
      borderBottom="1px"
      borderBottomColor="grey.200"
    >
      <Flex minWidth="max-content">
        <HStack spacing={6} alignItems="start">
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
          <Button size="sm" variant="tertiary" leftIcon={<EyeOutlineIcon />}>
            Preview
          </Button>
          <Button
            minWidth="10"
            variant="secondary"
            leftIcon={<SaveOutlineIcon />}
            onClick={save}
          >
            Save
          </Button>
          <Button
            minWidth="10"
            variant="primary"
            leftIcon={<TextOutlineIcon />}
          >
            Publish
          </Button>
          <IconButton
            color="blue.700"
            icon={<MoreVerticalOutlineIcon />}
            aria-label="more-vertical-outline"
            minWidth="10"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default CreateAssessementHeader;
