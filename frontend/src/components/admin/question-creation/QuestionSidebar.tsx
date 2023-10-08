import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
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

import { ImageIcon, QuestionIcon, TextIcon } from "../../../assets/icons";
import * as Routes from "../../../constants/Routes";
import typeToIconMetadata from "../../../constants/StudentAssessmentConstants";
import AssessmentContext from "../../../contexts/AssessmentContext";
import {
  QuestionElementType,
  ResponseElementType,
} from "../../../types/QuestionTypes";
import BackButton from "../../common/navigation/BackButton";

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
  const history = useHistory();
  const { assessmentId, questionIndex } = useParams<{
    assessmentId?: string;
    questionIndex?: string;
  }>();

  const { disableEditorPrompt, isQuestionEditorDirty } =
    useContext(AssessmentContext);

  const closeQuestionEditor = () => {
    const navigate = isQuestionEditorDirty
      ? history.push
      : disableEditorPrompt(history.push);
    navigate(Routes.ASSESSMENT_EDITOR_PAGE({ assessmentId }));
  };

  const closeQuestionEditorAfterSaving = () => {
    disableEditorPrompt(history.push)(
      Routes.ASSESSMENT_EDITOR_PAGE({ assessmentId }),
    );
  };

  return (
    <VStack
      boxShadow="8px 0px 4px -2px rgba(193, 186, 186, 0.25)"
      justifyContent="space-between"
      padding={{ base: "0.5em", md: "2em" }}
      sx={{ position: "sticky", top: "0", bottom: "0" }}
    >
      <Stack w="22vw">
        <Text as="h1" color="blue.300" display="flex" textStyle="header4">
          <BackButton onClick={closeQuestionEditor} />
          <Box as="span" ml={3}>
            Create Question
          </Box>
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
              panels: Object.values(ResponseElementType).map(
                (responseType) => ({
                  element: responseType,
                  icon: typeToIconMetadata[responseType].icon,
                }),
              ),
            },
          ])}
        </Accordion>
      </Stack>
      <HStack align="center" paddingTop="2em">
        <Button
          minWidth={0}
          onClick={() =>
            disableEditorPrompt(history.push)(
              Routes.ASSESSMENT_EDITOR_QUESTION_PREVIEW_PAGE({
                assessmentId,
                questionIndex,
              }),
            )
          }
          variant="secondary"
        >
          Preview
        </Button>
        <SaveQuestionEditorButton
          closeQuestionEditor={closeQuestionEditorAfterSaving}
        />
      </HStack>
    </VStack>
  );
};

export default QuestionSidebar;
