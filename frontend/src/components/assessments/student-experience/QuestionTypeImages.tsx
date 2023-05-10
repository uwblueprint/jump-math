import React from "react";
import { Box, HStack, Image, Text, Tooltip, VStack } from "@chakra-ui/react";

import typeToImageMetadata from "../../../constants/StudentAssessmentConstants";
import { ResponseElementType } from "../../../types/QuestionTypes";
import { removeUnderscore, titleCase } from "../../../utils/GeneralUtils";

const QuestionTypeImages = ({
  questionTypes,
}: {
  questionTypes: Array<ResponseElementType>;
}): React.ReactElement => {
  return (
    <HStack alignItems="flex-start" mt="2em" spacing="15%">
      {questionTypes?.map((type: ResponseElementType, index) => {
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
                padding="20%"
              >
                <Image
                  alt={typeToImageMetadata[type].alt}
                  src={typeToImageMetadata[type].src}
                  width="100px"
                />
              </Box>
            </Tooltip>
            <Text align="center" textStyle="caption">
              {titleCase(removeUnderscore(type))}
            </Text>
          </VStack>
        );
      })}
    </HStack>
  );
};

export default QuestionTypeImages;
