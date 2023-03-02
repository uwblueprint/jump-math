import React from "react";
import {
  Flex,
  VStack,
  Text,
  Button,
  Box,
  Spacer,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import {
  TextOutlinedIcon,
  SaveOutlinedIcon,
  EyeOutlinedIcon,
  MoreVerticalOutlineIcon,
  ArrowBackOutlineIcon,
} from "../../assets/icons";

type CreateAssessementHeaderProps = {
  assessmentName: string;
};

const CreateAssessementHeader = ({
  assessmentName,
}: CreateAssessementHeaderProps): React.ReactElement => {
  return (
    <Box
      margin="-1.5em -2em 2em -2em"
      padding="1.5em 2em 1.5em 2em"
      borderBottom="1px"
      borderBottomColor="grey.200"
    >
      <Flex minWidth="max-content">
        <HStack spacing={6} alignItems="start">
          <Button
            size="sm"
            color="blue.700"
            leftIcon={<ArrowBackOutlineIcon />}
          >
            Back
          </Button>
          <VStack align="left">
            <Text textStyle="subtitle1">
              {" "}
              {assessmentName.length > 0
                ? assessmentName
                : "Untitled Assessment"}{" "}
            </Text>
            <Text textStyle="smallerParagraph">Created January 1st, 2022</Text>
          </VStack>
        </HStack>
        <Spacer />
        <HStack spacing={2}>
          <HStack mr="2">
            <EyeOutlinedIcon />
            <Text color="blue.300" textStyle="link">
              Preview
            </Text>
          </HStack>
          <Button size="sm" variant="secondary" leftIcon={<SaveOutlinedIcon />}>
            Save
          </Button>
          <Button size="sm" variant="primary" leftIcon={<TextOutlinedIcon />}>
            Publish
          </Button>
          <IconButton
            color="blue.700"
            icon={<MoreVerticalOutlineIcon />}
            aria-label="more-vertical-outline"
            size="sm"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default CreateAssessementHeader;
