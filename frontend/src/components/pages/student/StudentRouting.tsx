import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_TEST } from "../../../APIClients/queries/TestQueries";
import { TestResponse } from "../../../APIClients/types/TestClientTypes";
import { TestSessionMetadata } from "../../../APIClients/types/TestSessionClientTypes";
import * as Routes from "../../../constants/Routes";
import StudentContext from "../../../contexts/StudentContext";
import { Answers } from "../../../types/AnswerTypes";
import { QuestionElementType } from "../../../types/QuestionTypes";
import PrivateRoute from "../../auth/PrivateRoute";
import ErrorState from "../../common/ErrorState";
import LoadingState from "../../common/LoadingState";
import NotFound from "../NotFound";

import AssessmentExperiencePage from "./AssessmentExperiencePage";
import AssessmentSummaryPage from "./AssessmentSummaryPage";

const StudentRouting = (): React.ReactElement => {
  const { state } = useLocation<{
    testId: string;
    testSession: TestSessionMetadata;
    className: string;
  }>();
  const [testId, setTestId] = useState("");
  const [testSession, setTestSession] = useState<TestSessionMetadata | null>(
    null,
  );
  const [className, setClassName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
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

        const emptyAnswers: Answers[] = data.test.questions.map(
          (question, index) => {
            const answerElements = question.filter(
              (questionElement) =>
                questionElement.type === QuestionElementType.QUESTION_TEXT,
            );
            return {
              index,
              elements: answerElements.map((_, elementIndex) => ({
                index: elementIndex,
                elementAnswers: [],
              })),
            };
          },
        );
        setAnswers(emptyAnswers);
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
        currentQuestion,
        setCurrentQuestion,
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
            component={AssessmentExperiencePage}
            exact
            path={Routes.ASSESSMENT_EXPERIENCE_PAGE}
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
