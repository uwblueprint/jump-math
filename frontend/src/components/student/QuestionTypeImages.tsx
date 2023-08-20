import React from "react";
import { Box, HStack, Icon, Text, Tooltip, VStack } from "@chakra-ui/react";

import typeToIconMetadata from "../../constants/StudentAssessmentConstants";
import type { ResponseElementType } from "../../types/QuestionTypes";
import { removeUnderscore, titleCase } from "../../utils/GeneralUtils";

const QuestionTypeImages = ({
  questionTypes,
}: {
  questionTypes: Array<ResponseElementType>;
}): React.ReactElement => {
  return (
    <HStack alignItems="flex-start" flexWrap="wrap" spacing="5%">
      {questionTypes?.map((type: ResponseElementType, index) => {
        return (
          <VStack key={index} gap={2}>
            <Tooltip
              align-items="center"
              bg="blue.300"
              borderRadius={4}
              fontWeight="700"
              hasArrow
              label={typeToIconMetadata[type].tooltip}
              offset={[0, -10]}
              padding="3"
              textAlign="center"
              width="190px"
            >
              <Box
                _hover={{ outline: "1px solid #154472" }}
                backgroundColor="blue.50"
                borderRadius="10px"
                padding="6px"
              >
                <Icon as={typeToIconMetadata[type].icon} />
              </Box>
            </Tooltip>
            <Text align="center" mb="6px" textStyle="caption">
              {titleCase(removeUnderscore(type))}
            </Text>
          </VStack>
        );
      })}
    </HStack>
  );
};

export default QuestionTypeImages;
