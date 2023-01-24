import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import { HOME_PAGE } from "../../constants/Routes";
import NotFound from "../pages/NotFound";
import { Role } from "../../types/AuthTypes";

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
    return <Route path={path} exact={exact} component={component} />;
  }
  return <Route path={path} exact={exact} component={NotFound} />;
};

export default PrivateRoute;
