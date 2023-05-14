import React from "react";
import { Box } from "@chakra-ui/react";

import { QuestionComponentResponse } from "../../APIClients/types/TestClientTypes";
import {
  ImageMetadata,
  MultipleChoiceMetadata,
  MultiSelectMetadata,
  QuestionTextMetadata,
  TextMetadata,
} from "../../types/QuestionMetadataTypes";
import { QuestionElementType } from "../../types/QuestionTypes";

import Image from "./question-elements/Image";
import MultipleChoice from "./question-elements/MultipleChoice";
import MultiSelect from "./question-elements/MultiSelect";
import QuestionText from "./question-elements/QuestionText";
import ShortAnswer from "./question-elements/ShortAnswer";
import Text from "./question-elements/Text";

interface DisplayQuestionProps {
  questionComponents: QuestionComponentResponse[];
}

const Question = ({
  questionComponents,
}: DisplayQuestionProps): React.ReactElement => {
  return (
    <>
      {questionComponents.map((question, i) => {
        return (
          <Box key={i} my={10}>
            {(() => {
              switch (question.type) {
                case QuestionElementType.QUESTION_TEXT:
                  return (
                    <QuestionText
                      questionText={
                        (question.metadata as QuestionTextMetadata).questionText
                      }
                    />
                  );
                case QuestionElementType.TEXT:
                  return (
                    <Text text={(question.metadata as TextMetadata).text} />
                  );
                case QuestionElementType.SHORT_ANSWER:
                  return <ShortAnswer />;
                case QuestionElementType.MULTIPLE_CHOICE:
                  return (
                    <MultipleChoice
                      options={
                        (question.metadata as MultipleChoiceMetadata).options
                      }
                    />
                  );
                case QuestionElementType.MULTI_SELECT:
                  return (
                    <MultiSelect
                      options={
                        (question.metadata as MultiSelectMetadata).options
                      }
                    />
                  );
                case QuestionElementType.IMAGE:
                  return (
                    <Image url={(question.metadata as ImageMetadata).url} />
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
