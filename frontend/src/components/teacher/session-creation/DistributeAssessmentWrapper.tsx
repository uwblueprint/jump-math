import React from "react";
import type { ApolloError } from "@apollo/client";
import { Box, Text, VStack } from "@chakra-ui/react";

import QueryStateHandler from "../../common/QueryStateHandler";

interface DistributeAssessmentWrapperProps {
  isLoading?: boolean;
  error?: ApolloError;
  isEmpty?: boolean;
  title: string;
  subtitle: string;
  emptyState?: React.ReactNode;
  children: React.ReactNode;
}

const DistributeAssessmentWrapper = ({
  isLoading = false,
  error,
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
      <QueryStateHandler error={error} loading={isLoading}>
        <Box pt={6}>{isEmpty ? emptyState : children}</Box>
      </QueryStateHandler>
    </VStack>
  );
};

export default DistributeAssessmentWrapper;
