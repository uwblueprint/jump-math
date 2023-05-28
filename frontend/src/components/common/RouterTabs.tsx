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
  component: React.ComponentType;
} & Omit<RouteProps, "component" | "render" | "children">;

type RouterTabsProps = {
  routes: RouteConfig[];
};

const RouterTabs = ({ routes }: RouterTabsProps) => {
  const history = useHistory();
  const matchParams = useParams();
  const location = useLocation();
  const currentRouteIndex = useMemo(
    () => routes.findIndex((route) => matchPath(location.pathname, route)),
    [location.pathname],
  );

  return (
    <>
      <Tabs
        index={currentRouteIndex}
        onChange={(index) =>
          history.push(generatePath(routes[index].path, matchParams))
        }
      >
        <TabList>
          {routes.map(({ name, path }) =>
            name ? <Tab key={path}>{name}</Tab> : null,
          )}
        </TabList>
        <TabPanels>
          {routes.map(({ path, component: Component }) => (
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
