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
  Icon,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import {
  ArrowBackOutlineIcon,
  ImageIcon,
  MultipleChoiceIcon,
  MultiSelectIcon,
  QuestionIcon,
  ShortAnswerIcon,
  TextIcon,
} from "../../assets/icons";

interface CreateQuestionSidebarProps {
  pageToNavigate: string;
}
interface AccordionItemProps {
  title: string;
  panels: AccordianPanelProps[];
}

interface AccordianPanelProps {
  icon: () => React.ReactElement;
  caption: string;
}

const renderAccordianPanel = (panels: AccordianPanelProps[]) => {
  return (
    <AccordionPanel pb={4}>
      <Wrap spacing="0.5em">
        {panels.map((panel: AccordianPanelProps, i) => {
          return (
            <WrapItem key={i}>
              <VStack>
                <Icon as={panel.icon} />
                <Text textStyle="caption">{panel.caption}</Text>
              </VStack>
            </WrapItem>
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
        {renderAccordianPanel(item.panels)}
      </AccordionItem>
    );
  });
};

const CreateQuestionSidebar = ({
  pageToNavigate,
}: CreateQuestionSidebarProps): React.ReactElement => {
  const history = useHistory();
  const navigateTo = () => history.push(pageToNavigate);

  return (
    <VStack
      minHeight="100vh"
      boxShadow="8px 4px 4px rgba(193, 186, 186, 0.25)"
      padding={{ base: "0.5em", md: "2em" }}
      justifyContent="space-between"
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
        <Accordion defaultIndex={[0]} paddingTop="1em" allowMultiple>
          {renderAccordionItem([
            {
              title: "Question",
              panels: [
                { icon: QuestionIcon, caption: "Question" },
                { icon: TextIcon, caption: "Text" },
                { icon: ImageIcon, caption: "Image" },
              ],
            },
            {
              title: "Response Type",
              panels: [
                { icon: MultipleChoiceIcon, caption: "Multiple Choice" },
                { icon: MultiSelectIcon, caption: "Multi-select" },
                { icon: ShortAnswerIcon, caption: "Short answer" },
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

export default CreateQuestionSidebar;
