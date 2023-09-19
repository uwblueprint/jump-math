import React from "react";
import type { ApolloError } from "@apollo/client";
import { Box, Center } from "@chakra-ui/react";

import ErrorState from "./info/ErrorState";
import LoadingState from "./info/LoadingState";

interface QueryStateHandlerProps {
  loading: boolean;
  error?: ApolloError;
  children: React.ReactNode | React.ReactNode[];
}

const QueryStateHandler = ({
  loading,
  error,
  children,
}: QueryStateHandlerProps): React.ReactElement => {
  if (loading)
    return (
      <Center flex="1" margin="15%">
        <LoadingState />
      </Center>
    );

  if (!!error)
    return (
      <Box height="100%" mt={10}>
        <ErrorState />
      </Box>
    );

  return <>{children}</>;
};

export default QueryStateHandler;
