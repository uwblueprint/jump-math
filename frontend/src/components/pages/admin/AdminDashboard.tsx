import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Box, VStack } from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import Page from "../../../types/PageTypes";
import PrivateRoute from "../../auth/PrivateRoute";
import Navbar from "../../common/Navbar";
import NotFound from "../NotFound";

import CreateAssessmentPage from "./CreateAssessmentPage";
import DisplayAssessmentsPage from "./DisplayAssessmentsPage";
import UsersPage from "./UsersPage";

const pages: Page[] = [
  { title: "Assessments", url: Routes.ASSESSMENTS },
  { title: "Database", url: Routes.USER_DATABASE },
];

const AdminDashboard = (): React.ReactElement => {
  return (
    <Switch>
      <PrivateRoute
        component={CreateAssessmentPage}
        exact
        path={`${Routes.CREATE_ASSESSMENT}/:date`}
        roles={["Admin"]}
      />
      <VStack align="left" flex="1">
        <Navbar pages={pages} />
        <Box padding="1.5em 2em 0em 2em">
          <Switch>
            <PrivateRoute
              component={UsersPage}
              exact
              path={Routes.USER_DATABASE}
              roles={["Admin"]}
            />
            <PrivateRoute
              component={DisplayAssessmentsPage}
              exact
              path={Routes.ASSESSMENTS}
              roles={["Admin"]}
            />
            <Redirect
              exact
              from={Routes.ADMIN_LANDING}
              to={Routes.USER_DATABASE}
            />
            <Route component={NotFound} exact path="*" />
          </Switch>
        </Box>
      </VStack>
    </Switch>
  );
};

export default AdminDashboard;
