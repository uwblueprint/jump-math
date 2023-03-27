import React from "react";
import { Box, HStack, Image, Text, Tooltip, VStack } from "@chakra-ui/react";

import { typeToImageMetadata } from "../../constants/StudentAssessmentConstants";
import { QuestionType } from "../../types/QuestionTypes";

const QuestionTypeImages = ({
  questionTypes,
}: {
  questionTypes: Array<QuestionType>;
}): React.ReactElement => {
  return (
    <HStack alignItems="flex-start" mt="2em" spacing="15%">
      {questionTypes?.map((type: QuestionType, index) => {
        return (
          <VStack key={index} gap={2}>
            <Box backgroundColor="blue.50" borderRadius="10px" padding="1.7em">
              <Tooltip
                align-items="center"
                bg="blue.300"
                borderRadius={4}
                fontWeight="700"
                hasArrow
                label={typeToImageMetadata[type].tooltip}
                placement="bottom"
                textAlign="center"
                width="190px"
              >
                <Image
                  alt={typeToImageMetadata[type].alt}
                  src={typeToImageMetadata[type].src}
                />
              </Tooltip>
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
