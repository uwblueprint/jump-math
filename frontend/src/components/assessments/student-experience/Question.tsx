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
import { QuestionElementType } from "../../../types/QuestionTypes";

import Image from "./question-components/Image";
import MultipleChoice from "./question-components/MultipleChoice";
import MultiSelect from "./question-components/MultiSelect";
import QuestionText from "./question-components/QuestionText";
import ShortAnswer from "./question-components/ShortAnswer";
import Text from "./question-components/Text";

interface QuestionProps {
  questionComponents: QuestionComponentResponse[];
}

const Question = ({
  questionComponents,
}: QuestionProps): React.ReactElement => {
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
