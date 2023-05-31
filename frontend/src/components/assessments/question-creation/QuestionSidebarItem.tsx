import React, { useContext } from "react";
import { useDrag } from "react-dnd";
import { Box, Icon, Text, Tooltip, VStack, WrapItem } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import editorTooltips from "../../../constants/QuestionConstants";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import { DragTypes } from "../../../types/DragTypes";
import type { QuestionElement } from "../../../types/QuestionTypes";
import { QuestionElementType } from "../../../types/QuestionTypes";
import { removeUnderscore, titleCase } from "../../../utils/GeneralUtils";

interface QuestionSidebarItemProps {
  type: QuestionElementType;
  icon: () => React.ReactElement;
}

interface DropResult {
  name: string;
}

const QuestionSidebarItem = ({
  type,
  icon,
}: QuestionSidebarItemProps): React.ReactElement => {
  const {
    setQuestionElements,
    setShowAddShortAnswerModal,
    setShowAddMultipleChoiceModal,
    setShowAddMultiSelectModal,
    setShowEditorError,
  } = useContext(QuestionEditorContext);

  const addQuestionElement = (newQuestionElement: QuestionElement) => {
    setQuestionElements((prevElements) => [
      ...prevElements,
      newQuestionElement,
    ]);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.QUESTION_SIDEBAR_ITEM,
    item: { type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        switch (item.type) {
          case QuestionElementType.QUESTION_TEXT:
            setShowEditorError(false);
            addQuestionElement({
              id: uuidv4(),
              type: item.type,
              data: { questionText: "" },
            });
            break;
          case QuestionElementType.TEXT:
            addQuestionElement({
              id: uuidv4(),
              type: item.type,
              data: { text: "" },
            });
            break;
          case QuestionElementType.IMAGE:
            addQuestionElement({
              id: uuidv4(),
              type: item.type,
              data: { previewUrl: "", file: undefined },
            });
            break;
          case QuestionElementType.SHORT_ANSWER:
            setShowAddShortAnswerModal(true);
            break;
          case QuestionElementType.MULTIPLE_CHOICE:
            setShowAddMultipleChoiceModal(true);
            break;
          case QuestionElementType.MULTI_SELECT:
            setShowAddMultiSelectModal(true);
            break;
          default:
            addQuestionElement({ id: uuidv4(), type: item.type, data: "" });
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <Tooltip
      bg="blue.300"
      borderRadius={4}
      hasArrow
      label={editorTooltips[type]}
      maxWidth="40"
      padding="3"
      placement="right-start"
      textAlign="left"
      textStyle="mobileSubtitle2"
    >
      <Box
        ref={drag}
        _hover={{ backgroundColor: "grey.100" }}
        borderRadius="4"
        padding="1.5"
        style={{ opacity }}
      >
        <WrapItem cursor="grab">
          <VStack>
            <Icon as={icon} />
            <Text align="center" maxWidth="20" textStyle="caption">
              {titleCase(removeUnderscore(type.valueOf()))}
            </Text>
          </VStack>
        </WrapItem>
      </Box>
    </Tooltip>
  );
};

export default QuestionSidebarItem;
