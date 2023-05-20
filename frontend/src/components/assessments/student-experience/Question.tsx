import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";

import { QuestionComponentResponse } from "../../../APIClients/types/TestClientTypes";
import {
  ImageMetadata,
  MultipleChoiceMetadata,
  MultiSelectMetadata,
  QuestionTextMetadata,
  TextMetadata,
} from "../../../types/QuestionMetadataTypes";
import {
  QuestionElementType,
  ResponseElementType,
} from "../../../types/QuestionTypes";

import Image from "./question-elements/Image";
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
    let answersSoFar = 0;
    return elements.map((element) => {
      if (element.type in ResponseElementType) {
        const elementIndex = answersSoFar;
        answersSoFar += 1;
        return elementIndex;
      }
      return 0;
    });
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
