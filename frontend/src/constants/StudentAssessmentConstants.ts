import { MULTI_CHOICE, MULTI_SELECT, SHORT_ANSWER } from "../assets/images";
import {
  QuestionElementType,
  ResponseElementType,
} from "../types/QuestionTypes";

const questionTypes: Array<ResponseElementType> = [
  QuestionElementType.MULTIPLE_CHOICE,
  QuestionElementType.MULTI_SELECT,
  QuestionElementType.SHORT_ANSWER,
];

export const assessmentMetadata = {
  numOfQuestions: 12,
  totalPoints: 50,
  questionTypes,
  rules:
    "The test WILL be monitored so please close any windows before starting the test. \nYou will have 1 hour to complete this test. No aids are permitted. \nIf you need clarification or assistance, please raise your hand quietly and I will come to you. \nGood Luck! \n- Mr. Roberts",
  startTime: "2:00pm",
  startDate: "September 15, 2022",
  testName: "Unit 0 Review Test",
};

export const typeToImageMetadata = {
  "Multiple Choice": {
    src: MULTI_CHOICE.src,
    alt: "multi-choice",
    tooltip:
      "Users will have to select the best response from a list of options",
  },
  "Multi-select": {
    src: MULTI_SELECT.src,
    alt: "multi-select",
    tooltip:
      "Users will have to select the correct responses from a list of options",
  },
  "Short Answer": {
    src: SHORT_ANSWER.src,
    alt: "short-answer",
    tooltip: "Users will have to type in their answers",
  },
};
