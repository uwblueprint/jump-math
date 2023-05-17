import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Box, VStack } from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import type Page from "../../../types/PageTypes";
import PrivateRoute from "../../auth/PrivateRoute";
import Navbar from "../../common/Navbar";
import NotFound from "../NotFound";

import ClassroomsPage from "./ClassroomsPage";
import DisplayAssessmentsPage from "./DisplayAssessmentsPage";
import DistributeAssessmentPage from "./DistributeAssessmentPage";
import TeacherDashboardPage from "./TeacherDashboardPage";

const pages: Page[] = [
  { title: "Dashboard", url: Routes.TEACHER_DASHBOARD_PAGE },
  { title: "Assessments", url: Routes.DISPLAY_ASSESSMENTS_PAGE },
  { title: "Classrooms", url: Routes.CLASSROOMS_PAGE },
];

const TeacherRouting = (): React.ReactElement => {
  return (
    <Switch>
      <VStack align="left" flex="1">
        <Navbar pages={pages} />
        <Box padding="1.5em 2em 0em 2em">
          <Switch>
            <PrivateRoute
              component={TeacherDashboardPage}
              exact
              path={Routes.TEACHER_DASHBOARD_PAGE}
              roles={["Teacher"]}
            />
            <PrivateRoute
              component={DisplayAssessmentsPage}
              exact
              path={Routes.DISPLAY_ASSESSMENTS_PAGE}
              roles={["Teacher"]}
            />
            <PrivateRoute
              component={DistributeAssessmentPage}
              exact
              path={Routes.DISTRIBUTE_ASSESSMENT_PAGE}
              roles={["Teacher"]}
            />
            <PrivateRoute
              component={ClassroomsPage}
              exact
              path={Routes.CLASSROOMS_PAGE}
              roles={["Teacher"]}
            />
            <Redirect
              exact
              from={Routes.TEACHER_LANDING_PAGE}
              to={Routes.TEACHER_DASHBOARD_PAGE}
            />
            <Route component={NotFound} exact path="*" />
          </Switch>
        </Box>
      </VStack>
    </Switch>
  );
};

export default TeacherRouting;
