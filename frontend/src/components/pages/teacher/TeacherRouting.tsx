import React from "react";
import { Route, Switch } from "react-router-dom";
import { Box, VStack } from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import type Page from "../../../types/PageTypes";
import PrivateRoute from "../../auth/PrivateRoute";
import RedirectTo from "../../auth/RedirectTo";
import Navbar from "../../common/navigation/Navbar";
import NotFound from "../NotFound";

import ClassroomsPage from "./ClassroomsPage";
import DisplayAssessmentResults from "./DisplayAssessmentResultsPage";
import DisplayAssessmentsPage from "./DisplayAssessmentsPage";
import DisplayClassroomPage from "./DisplayClassroomPage";
import DistributeAssessmentPage from "./DistributeAssessmentPage";
import TeacherDashboardPage from "./TeacherDashboardPage";

const pages: Page[] = [
  { title: "Dashboard", url: Routes.TEACHER_DASHBOARD_PAGE },
  { title: "Assessments", url: Routes.DISPLAY_ASSESSMENTS_PAGE },
  { title: "Classrooms", url: Routes.CLASSROOMS_PAGE },
];

const TeacherRouting = (): React.ReactElement => {
  return (
    <VStack align="left" flex="1" height="100vh">
      <Switch>
        <Route path={Routes.DISPLAY_ASSESSMENT_RESULTS_PAGE()} />
        <Route path="*">
          <Navbar pages={pages} />
        </Route>
      </Switch>
      <Box minHeight="90vh" padding="1.5em 2em 2em 2em">
        <Switch>
          <PrivateRoute
            component={DisplayAssessmentResults}
            path={Routes.DISPLAY_ASSESSMENT_RESULTS_PAGE()}
            roles={["Teacher"]}
            title="Assessment Results"
          />
          <PrivateRoute
            component={TeacherDashboardPage}
            exact
            path={Routes.TEACHER_DASHBOARD_PAGE}
            roles={["Teacher"]}
            title="Dashboard"
          />
          <PrivateRoute
            component={DisplayAssessmentsPage}
            exact
            path={Routes.DISPLAY_ASSESSMENTS_PAGE}
            roles={["Teacher"]}
            title="Assessments"
          />
          <PrivateRoute
            component={DistributeAssessmentPage}
            exact
            path={Routes.DISTRIBUTE_ASSESSMENT_PAGE}
            roles={["Teacher"]}
            title="Distribute Assessment"
          />
          <PrivateRoute
            component={ClassroomsPage}
            exact
            path={Routes.CLASSROOMS_PAGE}
            roles={["Teacher"]}
            title="Classrooms"
          />
          <PrivateRoute
            component={DisplayClassroomPage}
            path={Routes.DISPLAY_CLASSROOM_PAGE()}
            roles={["Teacher"]}
          />
          <Route exact path={Routes.TEACHER_LANDING_PAGE}>
            <RedirectTo pathname={Routes.TEACHER_DASHBOARD_PAGE} />
          </Route>
          <Route component={NotFound} exact path="*" />
        </Switch>
      </Box>
    </VStack>
  );
};

export default TeacherRouting;
