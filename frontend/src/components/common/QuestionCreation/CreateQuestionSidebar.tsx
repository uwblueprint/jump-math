import React from "react";
import {
  Box,
  Text,
  HStack,
  Button,
  VStack,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import {
  ArrowBackOutlineIcon,
  ColumnIcon,
  ImageIcon,
  MultipleChoiceIcon,
  MultiSelectIcon,
  QuestionIcon,
  ShortAnswerIcon,
  TextIcon,
  TitleIcon,
} from "../icons";

const CreateQuestionSidebar = (): React.ReactElement => {
  return (
    <VStack
      h="100vh"
      w="25vw"
      boxShadow="8px 4px 4px rgba(193, 186, 186, 0.25)"
      padding="2em"
      justifyContent="space-between"
    >
      <Stack align="left">
        <Button
          leftIcon={<ArrowBackOutlineIcon />}
          variant="tertiary"
          paddingLeft={0}
          justifyContent="flex-start"
        >
          Back
        </Button>
        <Text textStyle="header4" color="blue.300">
          Create Question
        </Text>

        <Accordion defaultIndex={[0]} paddingTop="1em" allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text textStyle="subtitle2">Layout</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <ColumnIcon />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text textStyle="subtitle2">Question</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <TitleIcon />
              <QuestionIcon />
              <TextIcon />
              <ImageIcon />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text textStyle="subtitle2">Response Type</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <MultipleChoiceIcon />
              <MultiSelectIcon />
              <ShortAnswerIcon />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
      <HStack align="center">
        <Button variant="secondary" minWidth={0}>
          Preview
        </Button>
        <Button variant="primary" minWidth={0}>
          Save
        </Button>
      </HStack>
    </VStack>
  );
};

export default CreateQuestionSidebar;
