import React from "react";
import { MULTI_SELECT, MULTI_CHOICE, SHORT_ANSWER } from "../assets/images";
import { QuestionType } from "../types/QuestionTypes";

export const assessmentMetadata = {
  numOfQuestions: 12,
  totalPoints: "50",
  questionTypes: [
    QuestionType.MULTIPLE_CHOICE,
    QuestionType.MULTI_SELECT,
    QuestionType.SHORT_ANSWER,
  ],
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
  },
  "Multi-select": {
    src: MULTI_SELECT.src,
    alt: "multi-select",
  },
  "Short Answer": {
    src: SHORT_ANSWER.src,
    alt: "short-answer",
  },
};
