import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";

import type {
  ImageMetadataRequest,
  QuestionTextMetadata,
  TextMetadata,
} from "../../../types/QuestionMetadataTypes";
import type { QuestionElement } from "../../../types/QuestionTypes";
import { QuestionElementType } from "../../../types/QuestionTypes";
import { getSubquestionIndexArray } from "../../../utils/StudentUtils";
import { getSubquestionIndex } from "../../../utils/StudentUtils";
import Image from "../../student/questions/question-elements/Image";
import QuestionText from "../../student/questions/question-elements/QuestionText";
import Text from "../../student/questions/question-elements/Text";

interface QuestionPreviewProps {
  elements: QuestionElement[];
}

const QuestionPreview = ({
  elements,
}: QuestionPreviewProps): React.ReactElement => {
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
                case QuestionElementType.IMAGE:
                  return (
                    <Image
                      url={(element.data as ImageMetadataRequest).previewUrl}
                    />
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

export default QuestionPreview;
