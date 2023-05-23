import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import type { Role } from "../../types/AuthTypes";
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
  const { authenticatedUser } = useContext(AuthContext);

  if (!authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }
  if (roles.includes(authenticatedUser.role)) {
    return <Route component={component} exact={exact} path={path} />;
  }
  return <Route component={NotFound} exact={exact} path={path} />;
};

export default PrivateRoute;
