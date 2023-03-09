import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { Switch, Route, Redirect } from "react-router-dom";

import Navbar from "../../common/Navbar";
import Page from "../../../types/PageTypes";
import * as Routes from "../../../constants/Routes";
import PrivateRoute from "../../auth/PrivateRoute";

import UsersPage from "./UsersPage";
import CreateAssessmentPage from "./CreateAssessmentPage";
import DisplayAssessmentsPage from "./DisplayAssessmentsPage";
import QuestionPage from "./QuestionPage";
import NotFound from "../NotFound";

const pages: Page[] = [
  { title: "Assessments", url: Routes.ASSESSMENTS },
  { title: "Database", url: Routes.USER_DATABASE },
];

const AdminDashboard = (): React.ReactElement => {
  return (
    <Switch>
      <PrivateRoute
        exact
        path={Routes.CREATE_QUESTION}
        component={QuestionPage}
        roles={["Admin"]}
      />
      <PrivateRoute
        exact
        path={Routes.CREATE_ASSESSMENT}
        component={CreateAssessmentPage}
        roles={["Admin"]}
      />
      <VStack flex="1" align="left">
        <Navbar pages={pages} />
        <Box padding="1.5em 2em 0em 2em">
          <Switch>
            <PrivateRoute
              exact
              path={Routes.USER_DATABASE}
              component={UsersPage}
              roles={["Admin"]}
            />
            <PrivateRoute
              exact
              path={Routes.ASSESSMENTS}
              component={DisplayAssessmentsPage}
              roles={["Admin"]}
            />
            <Redirect
              exact
              from={Routes.ADMIN_LANDING}
              to={Routes.USER_DATABASE}
            />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Box>
      </VStack>
    </Switch>
  );
};

export default AdminDashboard;
