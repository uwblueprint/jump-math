import type { QuestionComponent } from "../../types/questionTypes";
import { QuestionComponentType } from "../../types/questionTypes";
import { validateArray, validatePrimitive } from "./util";

const questionsValidator = (questions: QuestionComponent[][]): boolean => {
  questions?.forEach((questionComponents: QuestionComponent[]) => {
    questionComponents?.forEach((questionComponent: QuestionComponent) => {
      if (!("type" in questionComponent)) {
        throw new Error("Question component is missing a type field");
      }
      if (!("metadata" in questionComponent)) {
        throw new Error("Question component is missing a metadata field");
      }
      if (
        !Object.values(QuestionComponentType).includes(questionComponent.type)
      ) {
        throw new Error(
          `Question component has an invalid type: ${questionComponent.type}`,
        );
      }
      if (questionComponent.type === QuestionComponentType.QUESTION_TEXT) {
        if (!("questionText" in questionComponent.metadata)) {
          throw new Error(
            "Question text component is missing a questionText field",
          );
        }
        if (
          !validatePrimitive(questionComponent.metadata.questionText, "string")
        ) {
          throw new Error("The questionText field is not of type string");
        }
      } else if (questionComponent.type === QuestionComponentType.TEXT) {
        if (!("text" in questionComponent.metadata)) {
          throw new Error("Text component is missing a text field");
        }
        if (!validatePrimitive(questionComponent.metadata.text, "string")) {
          throw new Error("The text field is not of type string");
        }
      } else if (questionComponent.type === QuestionComponentType.IMAGE) {
        if (!("url" in questionComponent.metadata)) {
          throw new Error("Image component is missing a url field");
        }
        if (!validatePrimitive(questionComponent.metadata.url, "string")) {
          throw new Error("The src field is not of type string");
        }

        if (!("filePath" in questionComponent.metadata)) {
          throw new Error("Image component is missing a filePath field");
        }
        if (!validatePrimitive(questionComponent.metadata.filePath, "string")) {
          throw new Error("The filePath field is not of type string");
        }
      } else if (
        questionComponent.type === QuestionComponentType.MULTIPLE_CHOICE
      ) {
        if (!("options" in questionComponent.metadata)) {
          throw new Error(
            "Multiple Choice component is missing an options field",
          );
        }
        if (!validateArray(questionComponent.metadata.options, "string")) {
          throw new Error("The options field is not of type string[]");
        }

        if (!("answerIndex" in questionComponent.metadata)) {
          throw new Error(
            "Multiple Choice component is missing an answerIndex field",
          );
        }
        if (
          !validatePrimitive(questionComponent.metadata.answerIndex, "integer")
        ) {
          throw new Error("The answerIndex field is not of type integer");
        }
      } else if (
        questionComponent.type === QuestionComponentType.MULTI_SELECT
      ) {
        if (!("options" in questionComponent.metadata)) {
          throw new Error(
            "Multiple Choice component is missing a questionText field",
          );
        }
        if (!validateArray(questionComponent.metadata.options, "string")) {
          throw new Error("The options field is not of type string[]");
        }

        if (!("answerIndices" in questionComponent.metadata)) {
          throw new Error(
            "Multiple Choice component is missing an answerIndices field",
          );
        }
        if (
          !validateArray(questionComponent.metadata.answerIndices, "integer")
        ) {
          throw new Error("The answerIndices field is not of type integer[]");
        }
      } else if (
        questionComponent.type === QuestionComponentType.SHORT_ANSWER
      ) {
        if (!("answer" in questionComponent.metadata)) {
          throw new Error("Short Answer component is missing an answer field");
        }
        if (!validatePrimitive(questionComponent.metadata.answer, "number")) {
          throw new Error("The answer field is not of type number");
        }
      } else if (questionComponent.type === QuestionComponentType.FRACTION) {
        if (!("numerator" in questionComponent.metadata)) {
          throw new Error("Fraction component is missing a numerator field");
        }
        if (
          !validatePrimitive(questionComponent.metadata.numerator, "integer")
        ) {
          throw new Error("The numerator field is not of type integer");
        }
        if (!("denominator" in questionComponent.metadata)) {
          throw new Error("Fraction component is missing a denominator field");
        }
        if (
          !validatePrimitive(questionComponent.metadata.denominator, "integer")
        ) {
          throw new Error("The denominator field is not of type integer");
        }
        if (!("wholeNumber" in questionComponent.metadata)) {
          throw new Error("Fraction component is missing a wholeNumber field");
        }
        if (
          questionComponent.metadata.wholeNumber !== null &&
          !validatePrimitive(questionComponent.metadata.wholeNumber, "integer")
        ) {
          throw new Error(
            "The wholeNumber field is not of type null or integer",
          );
        }
      }
    });
  });

  return true;
};

export default questionsValidator;
