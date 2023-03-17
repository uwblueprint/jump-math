import React from "react";
import { Box, HStack, Image, Text, Tooltip, VStack } from "@chakra-ui/react";

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
            <Tooltip
              align-items="center"
              bg="blue.300"
              borderRadius={4}
              fontWeight="700"
              hasArrow
              label={typeToImageMetadata[type].tooltip}
              offset={[0, -10]}
              textAlign="center"
              width="190px"
            >
              <Box
                _hover={{ outline: "1px solid #154472" }}
                backgroundColor="blue.50"
                borderRadius="10px"
                padding="1.7em"
              >
                <Image
                  alt={typeToImageMetadata[type].alt}
                  src={typeToImageMetadata[type].src}
                />
              </Box>
            </Tooltip>
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
