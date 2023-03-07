import React from "react";
import { useHistory } from "react-router-dom";
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
  TextOutlineIcon,
  SaveOutlineIcon,
  EyeOutlineIcon,
  MoreVerticalOutlineIcon,
  ArrowBackOutlineIcon,
} from "../../assets/icons";
import { ASSESSMENTS } from "../../constants/Routes";

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
  const history = useHistory();
  return (
    <Box
      padding="1.5em 2em 1.5em 2em"
      borderBottom="1px"
      borderBottomColor="grey.200"
    >
      <Flex minWidth="max-content">
        <HStack spacing={6} alignItems="start">
          <Button
            size="sm"
            variant="tertiary"
            leftIcon={<ArrowBackOutlineIcon />}
            onClick={() => history.push(ASSESSMENTS)}
          >
            Back
          </Button>
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
