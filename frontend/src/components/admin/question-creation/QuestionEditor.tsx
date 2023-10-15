import type { SetStateAction } from "react";
import React, {
  type ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import * as Routes from "../../../constants/Routes";
import AssessmentContext from "../../../contexts/AssessmentContext";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import type { QuestionElement } from "../../../types/QuestionTypes";
import NotFound from "../../pages/NotFound";

import AddFractionModal from "./question-elements/modals/fraction/AddFractionModal";
import AddMultiOptionModal from "./question-elements/modals/multi-option/AddMultiOptionModal";
import AddShortAnswerModal from "./question-elements/modals/short-answer/AddShortAnswerModal";
import QuestionPreview from "./QuestionPreview";
import QuestionSidebar from "./QuestionSidebar";
import QuestionWorkspace from "./QuestionWorkspace";

const QuestionEditor = (): ReactElement => {
  const history = useHistory();
  const { assessmentId, questionIndex } = useParams<{
    assessmentId?: string;
    questionIndex?: string;
  }>();
  const { questions, disableEditorPrompt, setQuestionEditorDirty } =
    useContext(AssessmentContext);
  const editorQuestion = questions[Number(questionIndex) - 1];

  const [questionElements, setQuestionElements] = useState<QuestionElement[]>(
    editorQuestion?.elements ?? [],
  );
  const [showAddShortAnswerModal, setShowAddShortAnswerModal] = useState(false);
  const [showAddMultipleChoiceModal, setShowAddMultipleChoiceModal] =
    useState(false);
  const [showAddMultiSelectModal, setShowAddMultiSelectModal] = useState(false);
  const [showAddFractionModal, setShowAddFractionModal] = useState(false);
  const [showEditorError, setShowEditorError] = useState(false);

  useEffect(() => {
    // on page load
    setQuestionEditorDirty(false);
  }, [editorQuestion?.elements, setQuestionEditorDirty]);

  const setQuestionElementsWithDirtyCheck = (
    newElements: SetStateAction<QuestionElement[]>,
  ) => {
    setQuestionElements(newElements);
    setQuestionEditorDirty(true);
  };

  return (
    <QuestionEditorContext.Provider
      value={{
        questionElements,
        setQuestionElements: setQuestionElementsWithDirtyCheck,
        showAddShortAnswerModal,
        setShowAddShortAnswerModal,
        showAddMultipleChoiceModal,
        setShowAddMultipleChoiceModal,
        showAddMultiSelectModal,
        setShowAddMultiSelectModal,
        showAddFractionModal,
        setShowAddFractionModal,
        showEditorError,
        setShowEditorError,
      }}
    >
      <Switch>
        <Route
          exact
          path={Routes.ASSESSMENT_EDITOR_QUESTION_EDITOR_PAGE({
            assessmentId: assessmentId && ":assessmentId",
            questionIndex: questionIndex && ":questionIndex",
          })}
        >
          <Flex minHeight="100vh">
            <QuestionSidebar />
            <QuestionWorkspace />
          </Flex>
          <AddShortAnswerModal />
          <AddMultiOptionModal />
          <AddFractionModal />
        </Route>
        <Route
          path={Routes.ASSESSMENT_EDITOR_QUESTION_PREVIEW_PAGE({
            assessmentId: assessmentId && ":assessmentId",
            questionIndex: questionIndex && ":questionIndex",
          })}
        >
          <QuestionPreview
            goBack={() =>
              disableEditorPrompt(history.push)(
                Routes.ASSESSMENT_EDITOR_QUESTION_EDITOR_PAGE({
                  assessmentId,
                  questionIndex,
                }),
              )
            }
            questionElements={questionElements}
          />
        </Route>
        <Route component={NotFound} exact path="*" />
      </Switch>
    </QuestionEditorContext.Provider>
  );
};

export default QuestionEditor;
