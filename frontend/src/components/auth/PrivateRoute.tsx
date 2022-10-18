import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import { ADMIN_PAGE, LOGIN_PAGE, TEACHER_PAGE } from "../../constants/Routes";
import NotFound from "../pages/NotFound";

type PrivateRouteProps = {
  path: string;
  exact: boolean;
  component: React.FC;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  exact,
  path,
  component,
}: PrivateRouteProps) => {
  const { authenticatedUser } = useContext(AuthContext);

  if (!authenticatedUser) {
    return <Redirect to={LOGIN_PAGE} />;
  }
  if (
    (path === TEACHER_PAGE && authenticatedUser.role === "Teacher") ||
    (path === ADMIN_PAGE && authenticatedUser.role === "Admin")
  ) {
    return <Route path={path} exact={exact} component={component} />;
  }
  return <Route path={path} exact={exact} component={NotFound} />;
};

export default PrivateRoute;
