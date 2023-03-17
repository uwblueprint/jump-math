import React from "react";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { typeToImageMetadata } from "../../constants/StudentAssessmentConstants";
import { ResponseType } from "../../types/QuestionTypes";

const QuestionTypeImages = ({
  questionTypes,
}: {
  questionTypes: Array<ResponseType>;
}): React.ReactElement => {
  return (
    <HStack alignItems="flex-start" mt="2em" spacing="15%">
      {questionTypes?.map((type: ResponseType, index) => {
        return (
          <VStack key={index} gap={2}>
            <Box backgroundColor="blue.50" borderRadius="10px" padding="1.7em">
              <Image
                alt={typeToImageMetadata[type].alt}
                src={typeToImageMetadata[type].src}
              />
            </Box>
            <Text align="center" textStyle="caption">
              {type}
            </Text>
          </VStack>
        );
      })}
    </HStack>
  );
};

export default QuestionTypeImages;
