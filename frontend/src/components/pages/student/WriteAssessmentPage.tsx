import React, { useContext, useState } from "react";
import { Prompt } from "react-router-dom";

import confirmUnsavedChangesText from "../../../constants/GeneralConstants";
import StudentContext from "../../../contexts/StudentContext";
import WriteAssessmentContext from "../../../contexts/WriteAssessmentContext";
import type { Answers } from "../../../types/AnswerTypes";
import { initializeAnswers } from "../../../utils/StudentUtils";
import { getAnswerElements } from "../../../utils/StudentUtils";
import LoadingState from "../../common/info/LoadingState";
import TestSubmissionMessage from "../../common/info/messages/TestSubmissionMessage";
import useReloadPrompt from "../../common/navigation/useReloadPrompt";
import AssessmentExperience from "../../student/AssessmentExperience";
import NavButtons from "../../student/NavButtons";
import QuestionNumbers from "../../student/QuestionNumbers";
import Question from "../../student/questions/Question";

const WriteAssessmentPage = (): React.ReactElement => {
  useReloadPrompt();
  const { test, className } = useContext(StudentContext);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers[]>(
    test ? initializeAnswers(test.questions) : [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const pointCount = getAnswerElements(
    test?.questions[currentQuestionIndex] ?? [],
  ).length;

  return (
    <WriteAssessmentContext.Provider
      value={{
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        setAnswers,
        isLoading,
        setIsLoading,
        isSubmitted,
        setIsSubmitted,
      }}
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
            navButtons={<NavButtons />}
            pointCount={pointCount}
            questionNumber={currentQuestionIndex + 1}
            questionNumbers={<QuestionNumbers />}
            subtitle={className}
            title={test?.name ?? ""}
          >
            <Question elements={test?.questions[currentQuestionIndex] ?? []} />
          </AssessmentExperience>
        </>
      )}
    </WriteAssessmentContext.Provider>
  );
};

export default WriteAssessmentPage;
