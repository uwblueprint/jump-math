import React from "react";
import { Redirect, useLocation, useParams } from "react-router-dom";

type RedirectToProps<T> = {
  pathname: (params: T) => string;
  replace?: boolean;
};

const RedirectTo = <T extends { [K in keyof T]?: string } = object>({
  pathname,
  replace = true,
}: RedirectToProps<T>) => {
  const params = useParams<T>();
  const location = useLocation();
  return (
    <Redirect
      push={!replace}
      to={{
        pathname: pathname(params),
        state: location.state,
      }}
    />
  );
};

export default RedirectTo;
