import React from "react";
import { Box, Center, Text, VStack } from "@chakra-ui/react";

import ErrorState from "../../common/info/ErrorState";
import LoadingState from "../../common/info/LoadingState";

interface DistributeAssessmentWrapperProps {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  title: string;
  subtitle: string;
  emptyState?: React.ReactNode;
  children: React.ReactNode;
}

const DistributeAssessmentWrapper = ({
  isLoading = false,
  isError = false,
  isEmpty = false,
  title,
  subtitle,
  emptyState,
  children,
}: DistributeAssessmentWrapperProps): React.ReactElement => {
  return (
    <VStack align="left" spacing="2">
      <Text color="blue.300" textAlign="left" textStyle="header4">
        {title}
      </Text>
      <Text color="grey.300" textStyle="paragraph">
        {subtitle}
      </Text>
      <Box pt="6">
        {isLoading && (
          <Center flex="1" margin="15%">
            <LoadingState />
          </Center>
        )}
        {isError && (
          <Box height="100%" mt={10}>
            <ErrorState />
          </Box>
        )}
        {isEmpty && emptyState}
        {!isLoading && !isError && !isEmpty && children}
      </Box>
    </VStack>
  );
};

export default DistributeAssessmentWrapper;
