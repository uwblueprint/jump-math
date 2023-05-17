import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Box, VStack } from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import type Page from "../../../types/PageTypes";
import PrivateRoute from "../../auth/PrivateRoute";
import Navbar from "../../common/Navbar";
import NotFound from "../NotFound";

import AssessmentEditorPage from "./AssessmentEditorPage";
import DisplayAssessmentsPage from "./DisplayAssessmentsPage";
import UsersPage from "./UsersPage";

const pages: Page[] = [
  { title: "Assessments", url: Routes.ASSESSMENTS_PAGE },
  { title: "Database", url: Routes.USER_DATABASE_PAGE },
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
      <VStack align="left" flex="1">
        <Navbar pages={pages} />
        <Box padding="1.5em 2em 0em 2em">
          <Switch>
            <PrivateRoute
              component={UsersPage}
              exact
              path={Routes.USER_DATABASE_PAGE}
              roles={["Admin"]}
            />
            <PrivateRoute
              component={DisplayAssessmentsPage}
              exact
              path={Routes.ASSESSMENTS_PAGE}
              roles={["Admin"]}
            />
            <Redirect
              exact
              from={Routes.ADMIN_LANDING_PAGE}
              to={Routes.USER_DATABASE_PAGE}
            />
            <Route component={NotFound} exact path="*" />
          </Switch>
        </Box>
      </VStack>
    </Switch>
  );
};

export default AdminRouting;
