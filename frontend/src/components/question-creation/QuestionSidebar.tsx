import React from "react";
import { useHistory } from "react-router-dom";
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
import QuestionSidebarItem from "./QuestionSidebarItem";

import { QuestionElementType } from "../../types/QuestionTypes";

interface QuestionSidebarProps {
  backPage: string;
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
              elementType={panel.element}
              key={i}
              icon={panel.icon}
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
  backPage,
}: QuestionSidebarProps): React.ReactElement => {
  const history = useHistory();
  const navigateTo = () => history.push(backPage);

  return (
    <VStack
      boxShadow="8px 0px 4px -2px rgba(193, 186, 186, 0.25)"
      padding={{ base: "0.5em", md: "2em" }}
      justifyContent="space-between"
      sx={{ position: "sticky", top: "0", bottom: "0" }}
    >
      <Stack w="22vw">
        <Button
          leftIcon={<ArrowBackOutlineIcon />}
          variant="tertiary"
          paddingLeft={0}
          justifyContent="flex-start"
          onClick={navigateTo}
        >
          Back
        </Button>
        <Text textStyle="header4" color="blue.300">
          Create Question
        </Text>
        <Accordion defaultIndex={[0, 1]} paddingTop="1em" allowMultiple>
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

export default QuestionSidebar;
