import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";

import type { QuestionComponentResponse } from "../../../APIClients/types/TestClientTypes";
import type {
  FractionMetadata,
  ImageMetadata,
  MultipleChoiceMetadata,
  MultiSelectMetadata,
  QuestionTextMetadata,
  TextMetadata,
} from "../../../types/QuestionMetadataTypes";
import { QuestionElementType } from "../../../types/QuestionTypes";
import {
  getAnswerElementIndexArray,
  getSubquestionIndex,
  getSubquestionIndexArray,
} from "../../../utils/StudentUtils";

import Fraction from "./question-elements/Fraction";
import Image from "./question-elements/Image";
import MixedFraction from "./question-elements/MixedFraction";
import MultipleChoice from "./question-elements/MultipleChoice";
import MultiSelect from "./question-elements/MultiSelect";
import QuestionText from "./question-elements/QuestionText";
import ShortAnswer from "./question-elements/ShortAnswer";
import Text from "./question-elements/Text";

interface QuestionProps {
  elements: QuestionComponentResponse[];
}

const Question = ({ elements }: QuestionProps): React.ReactElement => {
  const answerElementIndex = useMemo(() => {
    return getAnswerElementIndexArray(elements);
  }, [elements]);
  const subquestionIndex = useMemo(() => {
    return getSubquestionIndexArray(elements);
  }, [elements]);

  return (
    <>
      {elements.map((element, i) => {
        return (
          <Box key={i} my={10}>
            {(() => {
              switch (element.type) {
                case QuestionElementType.QUESTION_TEXT:
                  return (
                    <QuestionText
                      index={getSubquestionIndex(subquestionIndex, i)}
                      questionText={
                        (element.metadata as QuestionTextMetadata).questionText
                      }
                    />
                  );
                case QuestionElementType.TEXT:
                  return (
                    <Text text={(element.metadata as TextMetadata).text} />
                  );
                case QuestionElementType.SHORT_ANSWER:
                  return (
                    <ShortAnswer answerElementIndex={answerElementIndex[i]} />
                  );
                case QuestionElementType.MULTIPLE_CHOICE:
                  return (
                    <MultipleChoice
                      answerElementIndex={answerElementIndex[i]}
                      options={
                        (element.metadata as MultipleChoiceMetadata).options
                      }
                    />
                  );
                case QuestionElementType.MULTI_SELECT:
                  return (
                    <MultiSelect
                      answerElementIndex={answerElementIndex[i]}
                      options={
                        (element.metadata as MultiSelectMetadata).options
                      }
                    />
                  );
                case QuestionElementType.IMAGE:
                  return (
                    <Image url={(element.metadata as ImageMetadata).url} />
                  );
                case QuestionElementType.FRACTION:
                  if (
                    (element.metadata as FractionMetadata).wholeNumber !== null
                  ) {
                    return (
                      <MixedFraction
                        answerElementIndex={answerElementIndex[i]}
                      />
                    );
                  }
                  return (
                    <Fraction answerElementIndex={answerElementIndex[i]} />
                  );
                default:
                  return null;
              }
            })()}
          </Box>
        );
      })}
    </>
  );
};

export default Question;
