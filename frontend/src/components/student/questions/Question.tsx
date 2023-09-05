import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";

import type {
  FractionMetadata,
  ImageMetadataRequest,
  QuestionTextMetadata,
  TextMetadata,
} from "../../../types/QuestionMetadataTypes";
import type { MultiData, QuestionElement } from "../../../types/QuestionTypes";
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
  elements: QuestionElement[];
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
          <Box key={i}>
            {(() => {
              switch (element.type) {
                case QuestionElementType.QUESTION_TEXT:
                  return (
                    <QuestionText
                      index={getSubquestionIndex(subquestionIndex, i)}
                      questionText={
                        (element.data as QuestionTextMetadata).questionText
                      }
                    />
                  );
                case QuestionElementType.TEXT:
                  return <Text text={(element.data as TextMetadata).text} />;
                case QuestionElementType.SHORT_ANSWER:
                  return (
                    <ShortAnswer answerElementIndex={answerElementIndex[i]} />
                  );
                case QuestionElementType.MULTIPLE_CHOICE:
                  return (
                    <MultipleChoice
                      answerElementIndex={answerElementIndex[i]}
                      options={(element.data as MultiData).options}
                    />
                  );
                case QuestionElementType.MULTI_SELECT:
                  return (
                    <MultiSelect
                      answerElementIndex={answerElementIndex[i]}
                      options={(element.data as MultiData).options}
                    />
                  );
                case QuestionElementType.IMAGE:
                  return (
                    <Image
                      url={(element.data as ImageMetadataRequest).previewUrl}
                    />
                  );
                case QuestionElementType.FRACTION:
                  if ((element.data as FractionMetadata).wholeNumber !== null) {
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
