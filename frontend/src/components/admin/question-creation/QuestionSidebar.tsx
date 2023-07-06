import React, { useContext } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";

import {
  ArrowBackOutlineIcon,
  ImageIcon,
  MultipleChoiceIcon,
  MultiSelectIcon,
  QuestionIcon,
  ShortAnswerIcon,
  TextIcon,
} from "../../../assets/icons";
import confirmUnsavedChangesText from "../../../constants/GeneralConstants";
import AssessmentContext from "../../../contexts/AssessmentContext";
import { QuestionElementType } from "../../../types/QuestionTypes";

import SaveQuestionEditorButton from "./question-elements/SaveQuestionEditorButton";
import QuestionSidebarItem from "./QuestionSidebarItem";

interface AccordionItemProps {
  title: string;
  panels: AccordionPanelProps[];
}

interface AccordionPanelProps {
  element: QuestionElementType;
  icon: () => React.ReactElement;
}

const renderAccordionPanel = (panels: AccordionPanelProps[]) => {
  return (
    <AccordionPanel pb={4}>
      <Wrap spacing="0">
        {panels.map((panel: AccordionPanelProps, i) => {
          return (
            <QuestionSidebarItem
              key={i}
              icon={panel.icon}
              type={panel.element}
            />
          );
        })}
      </Wrap>
    </AccordionPanel>
  );
};

const renderAccordionItem = (items: AccordionItemProps[]) => {
  return items.map((item: AccordionItemProps, i) => {
    return (
      <AccordionItem key={i}>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text textStyle="subtitle2">{item.title}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        {renderAccordionPanel(item.panels)}
      </AccordionItem>
    );
  });
};

const QuestionSidebar = (): React.ReactElement => {
  const { setShowQuestionEditor, setEditorQuestion } =
    useContext(AssessmentContext);

  const closeQuestionEditor = () => {
    setEditorQuestion(null);
    setShowQuestionEditor(false);
  };

  const confirmCloseQuestionEditor = () => {
    /* eslint-disable-next-line no-alert */
    if (window.confirm(confirmUnsavedChangesText)) {
      closeQuestionEditor();
    }
  };

  return (
    <VStack
      boxShadow="8px 0px 4px -2px rgba(193, 186, 186, 0.25)"
      justifyContent="space-between"
      padding={{ base: "0.5em", md: "2em" }}
      sx={{ position: "sticky", top: "0", bottom: "0" }}
    >
      <Stack w="22vw">
        <Box justifyContent="flex-start" paddingLeft="0">
          <Button
            leftIcon={<ArrowBackOutlineIcon />}
            onClick={confirmCloseQuestionEditor}
            size="sm"
            variant="tertiary"
          >
            Back
          </Button>
        </Box>
        <Text color="blue.300" textStyle="header4">
          Create Question
        </Text>
        <Accordion allowMultiple defaultIndex={[0, 1]} paddingTop="1em">
          {renderAccordionItem([
            {
              title: "Question",
              panels: [
                {
                  element: QuestionElementType.QUESTION_TEXT,
                  icon: QuestionIcon,
                },
                { element: QuestionElementType.TEXT, icon: TextIcon },
                { element: QuestionElementType.IMAGE, icon: ImageIcon },
              ],
            },
            {
              title: "Response Type",
              panels: [
                {
                  element: QuestionElementType.MULTIPLE_CHOICE,
                  icon: MultipleChoiceIcon,
                },
                {
                  element: QuestionElementType.MULTI_SELECT,
                  icon: MultiSelectIcon,
                },
                {
                  element: QuestionElementType.SHORT_ANSWER,
                  icon: ShortAnswerIcon,
                },
              ],
            },
          ])}
        </Accordion>
      </Stack>
      <HStack align="center" paddingTop="2em">
        <Button minWidth={0} variant="secondary">
          Preview
        </Button>
        <SaveQuestionEditorButton closeQuestionEditor={closeQuestionEditor} />
      </HStack>
    </VStack>
  );
};

export default QuestionSidebar;
