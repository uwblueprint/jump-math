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
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

export type RouteConfig = {
  name?: string;
  path: string;
} & (
  | {
      Component: React.ComponentType;
      element?: never;
    }
  | { element: React.ReactNode; Component?: never }
) &
  Omit<
    RouteProps,
    "component" | "element" | "redirect" | "render" | "children"
  >;

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
        display="flex"
        flex="1"
        flexDirection="column"
        index={currentRouteIndex}
        isLazy
        onChange={(index) => {
          const newPath = generatePath(routes[index].path, matchParams);
          if (newPath === location.pathname) return;
          return history.push({
            pathname: newPath,
            state: location.state,
          });
        }}
      >
        <TabList>
          {routes.map(({ name, path }) =>
            name ? <Tab key={path}>{name}</Tab> : null,
          )}
        </TabList>
        <TabPanels flex="1">
          {routes.map(({ path, Component, element }) => (
            <TabPanel key={path} h="full" p={0}>
              <Flex h="full">{Component ? <Component /> : element}</Flex>
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
