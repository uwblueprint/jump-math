import React from "react";
import type { ApolloError } from "@apollo/client";

import ErrorState from "./info/ErrorState";
import LoadingState from "./info/LoadingState";

interface StateHandlerProps {
  loading: boolean;
  error?: ApolloError;
  isEmpty?: boolean;
  emptyState?: React.ReactNode;
  children?: React.ReactNode | React.ReactNode[];
  fullPage?: boolean;
}

const StateHandler = ({
  loading,
  error,
  isEmpty = false,
  emptyState,
  children,
  fullPage,
}: StateHandlerProps): React.ReactElement => {
  if (loading) return <LoadingState fullPage={fullPage} />;

  if (!!error) return <ErrorState fullPage={fullPage} />;

  if (isEmpty && emptyState) return <>{emptyState}</>;

  return <>{children}</>;
};

export default StateHandler;
