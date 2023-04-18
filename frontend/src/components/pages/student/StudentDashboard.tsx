import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import * as Routes from "../../../constants/Routes";
import PrivateRoute from "../../auth/PrivateRoute";
import NotFound from "../NotFound";

import AssessmentSummaryPage from "./AssessmentSummaryPage";

const StudentDashboard = (): React.ReactElement => {
  return (
    <Switch>
      <PrivateRoute
        component={AssessmentSummaryPage}
        exact
        path={Routes.ASSESSMENT_SUMMARY_PAGE}
        roles={["Student"]}
      />
      <Redirect
        exact
        from={Routes.STUDENT_LANDING_PAGE}
        to={Routes.ASSESSMENT_SUMMARY_PAGE}
      />
      <Route component={NotFound} exact path="*" />
    </Switch>
  );
};

export default StudentDashboard;
