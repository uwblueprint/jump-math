import React from "react";
import type { ApolloError } from "@apollo/client";

import ErrorState from "./info/ErrorState";
import LoadingState from "./info/LoadingState";

interface StateHandlerProps {
  loading: boolean;
  error?: ApolloError;
  children: React.ReactNode | React.ReactNode[];
  fullPage?: boolean;
}

const StateHandler = ({
  loading,
  error,
  children,
  fullPage,
}: StateHandlerProps): React.ReactElement => {
  if (loading) return <LoadingState fullPage={fullPage} />;

  if (!!error) return <ErrorState fullPage={fullPage} />;

  return <>{children}</>;
};

export default StateHandler;
