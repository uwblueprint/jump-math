import React from "react";
import { Box, Center } from "@chakra-ui/react";

import { QuestionComponentResponse } from "../../APIClients/types/TestClientTypes";
import { QuestionElementType } from "../../types/QuestionTypes";
import DisplayQuestion from "../assessments/assessment-creation/DisplayQuestion";

const MOCK_DATA: QuestionComponentResponse[] = [
  {
    type: QuestionElementType.QUESTION_TEXT,
    metadata: {
      questionText:
        "Johnny is selling 19 apples at his store. Thomas buys 7 apples, Rick buys 2 apples, and Mike buys 3 apples. Then Thomas gives Rick 1 apple and Mike 3 apples. How much do they each have left now?",
      __typename: "QuestionTextMetadata",
    },
  },
  {
    type: QuestionElementType.TEXT,
    metadata: {
      text: "How many apples can you eat?",
      __typename: "TextMetadata",
    },
  },
  {
    type: QuestionElementType.SHORT_ANSWER,
    metadata: {
      answer: 5,
      __typename: "ShortAnswerMetadata",
    },
  },
  {
    type: QuestionElementType.MULTIPLE_CHOICE,
    metadata: {
      options: ["First", "Second", "Third", "Fourth"],
      answerIndex: 2,
      __typename: "MultipleChoiceMetadata",
    },
  },
  {
    type: QuestionElementType.TEXT,
    metadata: {
      text: "How many pears can you eat?",
      __typename: "TextMetadata",
    },
  },
  {
    type: QuestionElementType.MULTI_SELECT,
    metadata: {
      options: ["One", "Two", "Three", "Four", "Five"],
      answerIndex: 0,
      __typename: "MultiSelectMetadata",
    },
  },
];

const ComponentLibrary = (): React.ReactElement => {
  return (
    <Center>
      <Box w="60%">
        <DisplayQuestion questionComponents={MOCK_DATA} />
      </Box>
    </Center>
  );
};

export default ComponentLibrary;
