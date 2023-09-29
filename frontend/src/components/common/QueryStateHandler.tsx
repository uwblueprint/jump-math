import React from "react";
import type { ApolloError } from "@apollo/client";

import ErrorState from "./info/ErrorState";
import LoadingState from "./info/LoadingState";

interface QueryStateHandlerProps {
  loading: boolean;
  error?: ApolloError;
  children: React.ReactNode | React.ReactNode[];
  fullPage?: boolean;
}

const QueryStateHandler = ({
  loading,
  error,
  children,
  fullPage,
}: QueryStateHandlerProps): React.ReactElement => {
  if (loading) return <LoadingState fullPage={fullPage} />;

  if (!!error) return <ErrorState fullPage={fullPage} />;

  return <>{children}</>;
};

export default QueryStateHandler;
