import React, { type ComponentType, useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import type { Role } from "../../types/AuthTypes";
import NotFound from "../pages/NotFound";

import usePageTitle from "./usePageTitle";

type PageProps = {
  component: ComponentType;
  roles: Role[];
  title?: string;
};

type PrivateRouteProps = PageProps & {
  path: string;
  exact?: boolean;
};

const Page = ({ component: RenderComponent, roles, title }: PageProps) => {
  const { authenticatedUser } = useContext(AuthContext);

  const isSignedIn = authenticatedUser !== null;
  const isAuthorized = isSignedIn && roles.includes(authenticatedUser.role);

  usePageTitle(title, !isAuthorized);

  if (!isSignedIn) {
    return <Redirect to={HOME_PAGE} />;
  }

  if (!isAuthorized) {
    return <NotFound />;
  }

  return <RenderComponent />;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  exact = false,
  path,
  ...props
}: PrivateRouteProps) => {
  return (
    <Route exact={exact} path={path}>
      <Page {...props} />
    </Route>
  );
};

export default PrivateRoute;
