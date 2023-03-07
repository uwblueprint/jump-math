import React from "react";
import { Box, Text, Image, VStack, HStack } from "@chakra-ui/react";
import { QuestionType } from "../../types/QuestionTypes";
import { typeToImageMetadata } from "../../constants/StudentAssessmentConstants";

const QuestionTypeImages = ({
  questionTypes,
}: {
  questionTypes: Array<QuestionType>;
}): React.ReactElement => {
  return (
    <HStack spacing="15%" mt="2em" alignItems="flex-start">
      {questionTypes?.map((type: QuestionType, index) => {
        return (
          <VStack key={index} gap={2}>
            <Box backgroundColor="blue.50" borderRadius="10px" padding="1.7em">
              <Image
                src={typeToImageMetadata[type].src}
                alt={typeToImageMetadata[type].alt}
              />
            </Box>
            <Text textStyle="caption" align="center">
              {type}
            </Text>
          </VStack>
        );
      })}
    </HStack>
  );
};

export default QuestionTypeImages;
