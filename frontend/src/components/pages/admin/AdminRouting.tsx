import React from "react";
import { Route, Switch } from "react-router-dom";
import { Box, VStack } from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import type Page from "../../../types/PageTypes";
import PrivateRoute from "../../auth/PrivateRoute";
import RedirectTo from "../../auth/RedirectTo";
import Navbar from "../../common/navigation/Navbar";
import NotFound from "../NotFound";

import AssessmentEditorPage from "./AssessmentEditorPage";
import DisplayAssessmentsPage from "./DisplayAssessmentsPage";
import UsersPage from "./UsersPage";

const pages: Page[] = [
  { title: "Assessments", url: Routes.ASSESSMENTS_PAGE },
  { title: "Users", url: Routes.USERS_PAGE },
];

const AdminRouting = (): React.ReactElement => {
  return (
    <Switch>
      <PrivateRoute
        component={AssessmentEditorPage}
        exact
        path={Routes.ASSESSMENT_EDITOR_PAGE}
        roles={["Admin"]}
      />
      <Route path="*">
        <VStack align="left" flex="1" height="100vh">
          <Navbar pages={pages} />
          <Box padding="1.5em 2em 0em 2em">
            <Switch>
              <PrivateRoute
                component={UsersPage}
                exact
                path={Routes.USERS_PAGE}
                roles={["Admin"]}
                title="Users"
              />
              <PrivateRoute
                component={DisplayAssessmentsPage}
                exact
                path={Routes.ASSESSMENTS_PAGE}
                roles={["Admin"]}
                title="Assessments"
              />
              <Route exact path={Routes.ADMIN_LANDING_PAGE}>
                <RedirectTo pathname={Routes.ASSESSMENTS_PAGE} />
              </Route>
              <Route component={NotFound} exact path="*" />
            </Switch>
          </Box>
        </VStack>
      </Route>
    </Switch>
  );
};

export default AdminRouting;
