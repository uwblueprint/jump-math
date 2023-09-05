import React, { useContext, useMemo, useState } from "react";
import { Prompt } from "react-router-dom";

import confirmUnsavedChangesText from "../../../constants/GeneralConstants";
import StudentContext from "../../../contexts/StudentContext";
import WriteAssessmentContext from "../../../contexts/WriteAssessmentContext";
import { formatQuestionsResponse } from "../../../utils/QuestionUtils";
import LoadingState from "../../common/info/LoadingState";
import TestSubmissionMessage from "../../common/info/messages/TestSubmissionMessage";
import useReloadPrompt from "../../common/navigation/useReloadPrompt";
import AssessmentExperience from "../../student/AssessmentExperience";

const WriteAssessmentPage = (): React.ReactElement => {
  useReloadPrompt();
  const { test, className } = useContext(StudentContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = useMemo(() => {
    return test ? formatQuestionsResponse(test.questions) : [];
  }, [test]);

  return (
    <WriteAssessmentContext.Provider
      value={{ isLoading, setIsLoading, isSubmitted, setIsSubmitted }}
    >
      {isLoading ? (
        <LoadingState
          fullPage
          text="Please wait while we submit your assessment."
        />
      ) : isSubmitted ? (
        <TestSubmissionMessage />
      ) : (
        <>
          <Prompt message={confirmUnsavedChangesText} />
          <AssessmentExperience
            questions={questions}
            subtitle={className}
            title={test?.name ?? ""}
          />
        </>
      )}
    </WriteAssessmentContext.Provider>
  );
};

export default WriteAssessmentPage;
