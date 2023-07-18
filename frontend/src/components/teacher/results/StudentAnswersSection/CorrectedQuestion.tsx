import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";

import type { QuestionComponentResponse } from "../../../../APIClients/types/TestClientTypes";
import type {
  ImageMetadata,
  MultipleChoiceMetadata,
  MultiSelectMetadata,
  QuestionTextMetadata,
  ShortAnswerMetadata,
  TextMetadata,
} from "../../../../types/QuestionMetadataTypes";
import { QuestionElementType } from "../../../../types/QuestionTypes";
import {
  getAnswerElementIndexArray,
  getSubquestionIndex,
  getSubquestionIndexArray,
} from "../../../../utils/StudentUtils";
import Image from "../../../student/questions/question-elements/Image";
import QuestionText from "../../../student/questions/question-elements/QuestionText";
import Text from "../../../student/questions/question-elements/Text";

import CorrectedMultipleChoice from "./question-elements/CorrectedMultipleChoice";
import CorrectedMultiSelect from "./question-elements/CorrectedMultiSelect";
import CorrectedShortAnswer from "./question-elements/CorrectedShortAnswer";

interface QuestionProps {
  elements: QuestionComponentResponse[];
  studentAnswers: number[][];
}

const CorrectedQuestion = ({
  elements,
  studentAnswers,
}: QuestionProps): React.ReactElement => {
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
                    <Box mt={6}>
                      <QuestionText
                        index={getSubquestionIndex(subquestionIndex, i)}
                        questionText={
                          (element.metadata as QuestionTextMetadata)
                            .questionText
                        }
                      />
                    </Box>
                  );
                case QuestionElementType.TEXT:
                  return (
                    <Box mt={2}>
                      <Text text={(element.metadata as TextMetadata).text} />
                    </Box>
                  );
                case QuestionElementType.SHORT_ANSWER:
                  return (
                    <Box mt={8}>
                      <CorrectedShortAnswer
                        correctAnswer={
                          (element.metadata as ShortAnswerMetadata).answer
                        }
                        studentAnswer={studentAnswers[answerElementIndex[i]][0]}
                      />
                    </Box>
                  );
                case QuestionElementType.MULTIPLE_CHOICE:
                  return (
                    <Box mt={8}>
                      <CorrectedMultipleChoice
                        correctAnswerIndex={
                          (element.metadata as MultipleChoiceMetadata)
                            .answerIndex
                        }
                        options={
                          (element.metadata as MultipleChoiceMetadata).options
                        }
                        studentAnswerIndex={
                          studentAnswers[answerElementIndex[i]][0]
                        }
                      />
                    </Box>
                  );
                case QuestionElementType.MULTI_SELECT:
                  return (
                    <Box mt={8}>
                      <CorrectedMultiSelect
                        correctAnswerIndices={
                          (element.metadata as MultiSelectMetadata)
                            .answerIndices
                        }
                        options={
                          (element.metadata as MultiSelectMetadata).options
                        }
                        studentAnswerIndices={
                          studentAnswers[answerElementIndex[i]]
                        }
                      />
                    </Box>
                  );
                case QuestionElementType.IMAGE:
                  return (
                    <Box mt={8}>
                      <Image url={(element.metadata as ImageMetadata).url} />
                    </Box>
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

export default CorrectedQuestion;
