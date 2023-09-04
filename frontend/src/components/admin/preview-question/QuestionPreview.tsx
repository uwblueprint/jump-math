import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";

import type {
  FractionMetadata,
  ImageMetadataRequest,
  QuestionTextMetadata,
  TextMetadata,
} from "../../../types/QuestionMetadataTypes";
import type {
  MultiData,
  MultiOptionData,
  QuestionElement,
} from "../../../types/QuestionTypes";
import { QuestionElementType } from "../../../types/QuestionTypes";
import { getSubquestionIndexArray } from "../../../utils/StudentUtils";
import { getSubquestionIndex } from "../../../utils/StudentUtils";
import FractionInput from "../../common/question-elements/fraction/FractionInput";
import MultipleChoiceInput from "../../common/question-elements/multi-option/MultipleChoiceInput";
import MultiSelectInput from "../../common/question-elements/multi-option/MultiSelectInput";
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
                case QuestionElementType.MULTIPLE_CHOICE:
                  return (
                    <MultipleChoiceInput
                      getOption={(option) => (option as MultiOptionData).value}
                      getOptionValue={(_, index) => index.toString()}
                      onChange={(e) => console.log(e)} // TODO
                      options={(element.data as MultiData).options}
                      value={"0"} // TODO
                    />
                  );
                case QuestionElementType.MULTI_SELECT:
                  return (
                    <MultiSelectInput
                      getOption={(option) => (option as MultiOptionData).value}
                      getOptionValue={(_, index) => index.toString()}
                      onChange={(e) => console.log(e)} // TODO
                      options={(element.data as MultiData).options}
                      value={["0"]} // TODO
                    />
                  );
                case QuestionElementType.FRACTION: // TODO
                  if ((element.data as FractionMetadata).wholeNumber !== null) {
                    return (
                      <FractionInput
                        denominator={""}
                        numerator={""}
                        onDenominatorChange={(e) => console.log(e)}
                        onNumeratorChange={(e) => console.log(e)}
                        onWholeNumberChange={(e) => console.log(e)}
                        wholeNumber={""}
                      />
                    );
                  }
                  return (
                    <FractionInput
                      denominator={""}
                      numerator={""}
                      onDenominatorChange={(e) => console.log(e)}
                      onNumeratorChange={(e) => console.log(e)}
                      wholeNumber={null}
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
