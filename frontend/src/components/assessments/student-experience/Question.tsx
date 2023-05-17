import React from "react";
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

import Image from "./question-components/Image";
import MultipleChoice from "./question-components/MultipleChoice";
import MultiSelect from "./question-components/MultiSelect";
import QuestionText from "./question-components/QuestionText";
import ShortAnswer from "./question-components/ShortAnswer";
import Text from "./question-components/Text";

interface QuestionProps {
  elements: QuestionComponentResponse[];
}

const Question = ({ elements }: QuestionProps): React.ReactElement => {
  let counter = -1;
  const answerElementIndex = elements.map((element) => {
    if (element.type in ResponseElementType) {
      counter += 1;
      return counter;
    }
    return 0;
  });

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
