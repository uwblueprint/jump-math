import React, { useMemo } from "react";
import {
  generatePath,
  matchPath,
  Route,
  type RouteProps,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

type RouteConfig = {
  name?: string;
  path: string;
  Component: React.ComponentType;
} & Omit<RouteProps, "component" | "redirect" | "render" | "children">;

type RouterTabsProps = {
  routes: RouteConfig[];
};

const RouterTabs = ({ routes }: RouterTabsProps) => {
  const history = useHistory();
  const matchParams = useParams();
  const location = useLocation();
  const currentRouteIndex = useMemo(
    () => routes.findIndex((route) => matchPath(location.pathname, route)),
    [routes, location.pathname],
  );

  return (
    <>
      <Tabs
        index={currentRouteIndex}
        isLazy
        onChange={(index) =>
          history.push({
            pathname: generatePath(routes[index].path, matchParams),
            state: location.state,
          })
        }
      >
        <TabList>
          {routes.map(({ name, path }) =>
            name ? <Tab key={path}>{name}</Tab> : null,
          )}
        </TabList>
        <TabPanels>
          {routes.map(({ path, Component }) => (
            <TabPanel key={path} p={0} pt={8}>
              <Component />
            </TabPanel>
          ))}
        </TabPanels>
        <Switch>
          {routes.map(({ path }) => (
            <Route key={path} path={path} />
          ))}
        </Switch>
      </Tabs>
    </>
  );
};

export default RouterTabs;