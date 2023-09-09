import React from "react";
import { Redirect, useLocation, useParams } from "react-router-dom";

import usePageTitle from "./usePageTitle";

type RedirectToProps<T> = {
  pathname: string | ((params: T) => string);
  replace?: boolean;
  title?: string;
};

const RedirectTo = <T extends { [K in keyof T]?: string } = object>({
  pathname,
  replace = true,
  title,
}: RedirectToProps<T>) => {
  const params = useParams<T>();
  const location = useLocation();

  usePageTitle(title ?? "Redirecting...");

  return (
    <Redirect
      push={!replace}
      to={{
        pathname: typeof pathname === "string" ? pathname : pathname(params),
        state: location.state,
      }}
    />
  );
};

export default RedirectTo;
