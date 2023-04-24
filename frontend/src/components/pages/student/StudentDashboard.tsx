import React, { useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";

import { TestResponse } from "../../../APIClients/types/TestClientTypes";
import * as Routes from "../../../constants/Routes";
import StudentContext from "../../../contexts/StudentContext";
import PrivateRoute from "../../auth/PrivateRoute";
import NotFound from "../NotFound";

import AssessmentSummaryPage from "./AssessmentSummaryPage";

const StudentDashboard = (): React.ReactElement => {
  const [test, setTest] = useState<TestResponse | null>(null);
  const [testSession, setTestSession] = useState("");

  return (
    <StudentContext.Provider
      value={{ test, setTest, testSession, setTestSession }}
    >
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
    </StudentContext.Provider>
  );
};

export default StudentDashboard;
