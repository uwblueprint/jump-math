import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { Role } from "../../types/AuthTypes";
import NotFound from "../pages/NotFound";

type PrivateRouteProps = {
  component: React.FC;
  path: string;
  exact?: boolean;
  roles: Role[];
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  exact = false,
  path,
  component,
  roles,
}: PrivateRouteProps) => {
  const { authenticatedUser, authenticatedStudent } = useContext(AuthContext);

  if (!authenticatedUser && !authenticatedStudent) {
    return <Redirect to={HOME_PAGE} />;
  }
  if (authenticatedUser) {
    if (roles.includes(authenticatedUser.role)) {
      return <Route component={component} exact={exact} path={path} />;
    }
  }
  if (authenticatedStudent) {
    if (roles.includes("Student")) {
      return <Route component={component} exact={exact} path={path} />;
    }
  }
  return <Route component={NotFound} exact={exact} path={path} />;
};

export default PrivateRoute;
