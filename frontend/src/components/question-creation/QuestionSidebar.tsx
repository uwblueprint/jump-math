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
} from "../../assets/icons";
import QuestionEditorContext from "../../contexts/QuestionEditorContext";
import {
  QuestionElement,
  QuestionElementType,
} from "../../types/QuestionTypes";
import { updatedQuestionElement } from "../../utils/QuestionUtils";

import SaveQuestionEditorButton from "./question-elements/SaveQuestionEditorButton";
import QuestionSidebarItem from "./QuestionSidebarItem";

interface QuestionSidebarProps {
  setShowQuestionEditor: React.Dispatch<React.SetStateAction<boolean>>;
  setQuestions: React.Dispatch<React.SetStateAction<QuestionElement[][]>>;
}

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
      <Wrap spacing="0.5em">
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

const QuestionSidebar = ({
  setShowQuestionEditor,
  setQuestions,
}: QuestionSidebarProps): React.ReactElement => {
  const { questionElements, setQuestionElements } = useContext(
    QuestionEditorContext,
  );

  const questionError =
    "Please create a question to be associated with this response";
  const responseError =
    "Please add at least one response type for this question";
  const emptyError =
    "Please ensure all fields are filled. If you do not need this component, please delete this component.";

  const setElementError = (questionElement: QuestionElement, error: string) => {
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(
        questionElement.id,
        questionElement.data,
        prevElements,
        error,
      );
    });
  };

  const validateQuestionElements = () => {
    const emptyElement = questionElements.find((element) => !element.data);
    if (emptyElement) {
      setElementError(emptyElement, emptyError);
    }

    const existingError = questionElements.some((element) => element.error);
    return !emptyElement && !existingError;
  };

  const validateQuestionPairs = () => {
    let expectQuestion = true;
    let pairIndex = 0;
    /* eslint-disable-next-line no-plusplus */
    for (let i = 0; i < questionElements.length; ++i) {
      switch (questionElements[i].type) {
        case QuestionElementType.QUESTION: {
          if (!expectQuestion) {
            setElementError(questionElements[pairIndex], responseError);
            return false;
          }
          setElementError(questionElements[pairIndex], "");
          pairIndex = i;
          expectQuestion = false;
          break;
        }
        case QuestionElementType.SHORT_ANSWER: {
          if (expectQuestion) {
            setElementError(questionElements[i], questionError);
            return false;
          }
          setElementError(questionElements[i], "");
          pairIndex = i;
          expectQuestion = true;
          break;
        }
        default: {
          break;
        }
      }
    }
    if (!expectQuestion) {
      setElementError(questionElements[pairIndex], responseError);
      return false;
    }
    setElementError(questionElements[pairIndex], "");
    return true;
  };

  const validateQuestionEditorContent = () => {
    const validPairs = validateQuestionPairs();
    const validElements = validateQuestionElements();
    return validPairs && validElements;
  };

  const handleSave = () => {
    const isValid = validateQuestionEditorContent();
    if (isValid) {
      setQuestions((prevQuestions) => {
        return [...prevQuestions, questionElements];
      });
      setShowQuestionEditor(false);
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
            onClick={() => setShowQuestionEditor(false)}
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
                { element: QuestionElementType.QUESTION, icon: QuestionIcon },
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
        <SaveQuestionEditorButton
          setQuestions={setQuestions}
          setShowQuestionEditor={setShowQuestionEditor}
        />
      </HStack>
    </VStack>
  );
};

export default QuestionSidebar;
