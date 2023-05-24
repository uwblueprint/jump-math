import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_TEST } from "../../../APIClients/queries/TestQueries";
import type { TestResponse } from "../../../APIClients/types/TestClientTypes";
import type { TestSessionSetupData } from "../../../APIClients/types/TestSessionClientTypes";
import * as Routes from "../../../constants/Routes";
import StudentContext from "../../../contexts/StudentContext";
import type { Answers } from "../../../types/AnswerTypes";
import { initializeAnswers } from "../../../utils/StudentUtils";
import PrivateRoute from "../../auth/PrivateRoute";
import ErrorState from "../../common/ErrorState";
import LoadingState from "../../common/LoadingState";
import NotFound from "../NotFound";

import AssessmentSummaryPage from "./AssessmentSummaryPage";
import WriteAssessmentPage from "./WriteAssessmentPage";

const StudentRouting = (): React.ReactElement => {
  const { state } = useLocation<{
    testId: string;
    testSession: TestSessionSetupData;
    className: string;
  }>();
  const [testId, setTestId] = useState("");
  const [testSession, setTestSession] = useState<TestSessionSetupData | null>(
    null,
  );
  const [className, setClassName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers[]>([]);

  useEffect(() => {
    if (state) {
      setTestId(state.testId);
      setTestSession(state.testSession);
      setClassName(state.className);
    }
  }, [state]);

  const [test, setTest] = useState<TestResponse | null>(null);
  const { loading, data, error } = useQuery<{ test: TestResponse }>(GET_TEST, {
    fetchPolicy: "cache-and-network",
    variables: { id: testId },
    skip: !testId,
    onCompleted: () => {
      if (data) {
        setTest(data.test);
        setAnswers(initializeAnswers(data.test.questions));
      }
    },
  });

  return (
    <StudentContext.Provider
      value={{
        test,
        setTest,
        testSession,
        setTestSession,
        className,
        setClassName,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        setAnswers,
      }}
    >
      {loading && <LoadingState fullPage />}
      {error && <ErrorState fullPage />}
      {data && (
        <Switch>
          <PrivateRoute
            component={AssessmentSummaryPage}
            exact
            path={Routes.ASSESSMENT_SUMMARY_PAGE}
            roles={["Student"]}
          />
          <PrivateRoute
            component={WriteAssessmentPage}
            exact
            path={Routes.WRITE_ASSESSMENT_PAGE}
            roles={["Student"]}
          />
          <Redirect
            exact
            from={Routes.STUDENT_LANDING_PAGE}
            to={Routes.ASSESSMENT_SUMMARY_PAGE}
          />
          <Route component={NotFound} exact path="*" />
        </Switch>
      )}
    </StudentContext.Provider>
  );
};

export default StudentRouting;
