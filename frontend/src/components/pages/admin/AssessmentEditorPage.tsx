import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Prompt, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Divider, VStack } from "@chakra-ui/react";

import {
  CREATE_NEW_TEST,
  DELETE_TEST,
  UPDATE_TEST,
} from "../../../APIClients/mutations/TestMutations";
import type {
  Test,
  TestRequest,
} from "../../../APIClients/types/TestClientTypes";
import confirmUnsavedChangesText from "../../../constants/GeneralConstants";
import { ASSESSMENTS_PAGE } from "../../../constants/Routes";
import AssessmentContext from "../../../contexts/AssessmentContext";
import { Status } from "../../../types/AssessmentTypes";
import type { Question } from "../../../types/QuestionTypes";
import { formatQuestionsRequest } from "../../../utils/QuestionUtils";
import AssessmentEditorHeader from "../../assessments/assessment-creation/AssessmentEditorHeader";
import AssessmentQuestions from "../../assessments/assessment-creation/AssessmentQuestions";
import BasicInformation from "../../assessments/assessment-creation/BasicInformation";
import QuestionEditor from "../../assessments/question-creation/QuestionEditor";
import useReloadPrompt from "../../common/navigation/useReloadPrompt";

const AssessmentEditorPage = (): React.ReactElement => {
  useReloadPrompt();
  const { state } = useLocation<Test>();
  const history = useHistory();

  const [questions, setQuestions] = useState<Question[]>(
    state?.questions || [],
  );
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [editorQuestion, setEditorQuestion] = useState<Question | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [completedForm, setCompletedForm] = useState(false);

  const [createTest] = useMutation<{
    createTest: { createTest: { id: string } };
  }>(CREATE_NEW_TEST);

  const [updateTest] = useMutation<{
    updateTest: { updateTest: { id: string } };
  }>(UPDATE_TEST);

  const [deleteTest] = useMutation<{
    deleteTest: string;
  }>(DELETE_TEST);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    watch,
    clearErrors,
  } = useForm<TestRequest, unknown>({
    defaultValues: {
      name: state?.name,
      questions: state?.questions,
      grade: state?.grade,
      assessmentType: state?.assessmentType,
      status: state?.status,
      curriculumCountry: state?.curriculumCountry,
      curriculumRegion: state?.curriculumRegion,
    },
  });

  const noQuestionError =
    "Please add at least one question to the assessment before saving";
  useEffect(() => {
    if (errorMessage === noQuestionError && questions.length !== 0) {
      setErrorMessage("");
    }
  }, [questions, errorMessage]);

  const validateForm = () => {
    if (questions.length === 0) {
      setErrorMessage(noQuestionError);
      return false;
    }
    return true;
  };

  const onCreateTest = async (test: TestRequest) => {
    if (validateForm()) {
      await createTest({
        variables: {
          test,
        },
      })
        .then(() => {
          setCompletedForm(true);
          history.push(ASSESSMENTS_PAGE);
        })
        .catch(() => {
          setErrorMessage("Assessment failed to save. Please try again.");
        });
    }
  };

  const onUpdateTest = async (test: TestRequest) => {
    if (validateForm() && state?.id) {
      await updateTest({
        variables: {
          id: state.id,
          test,
        },
      })
        .then(() => {
          setCompletedForm(true);
          history.push(ASSESSMENTS_PAGE);
        })
        .catch(() => {
          setErrorMessage("Assessment failed to update. Please try again.");
        });
    }
  };

  const onDeleteTest = async () => {
    if (state?.id) {
      await deleteTest({ variables: { id: state.id } })
        .then(() => {
          history.push(ASSESSMENTS_PAGE);
        })
        .catch(() => {
          setErrorMessage("Assessment failed to delete. Please try again.");
        });
    }
  };

  const onSave: SubmitHandler<TestRequest> = async (data) => {
    onCreateTest({
      ...data,
      status: Status.DRAFT,
      questions: formatQuestionsRequest(questions),
    });
  };

  const onPublish: SubmitHandler<TestRequest> = async (data: TestRequest) => {
    onCreateTest({
      ...data,
      status: Status.PUBLISHED,
      questions: formatQuestionsRequest(questions),
    });
  };

  const onSaveChanges: SubmitHandler<TestRequest> = async (
    data: TestRequest,
  ) => {
    onUpdateTest({
      ...data,
      questions: formatQuestionsRequest(questions),
    });
  };

  const onPublishChanges: SubmitHandler<TestRequest> = async (
    data: TestRequest,
  ) => {
    onUpdateTest({
      ...data,
      status: Status.PUBLISHED,
      questions: formatQuestionsRequest(questions),
    });
  };

  const onArchiveChanges: SubmitHandler<TestRequest> = async (
    data: TestRequest,
  ) => {
    onUpdateTest({
      ...data,
      status: Status.ARCHIVED,
      questions: formatQuestionsRequest(questions),
    });
  };

  const onError = () => {
    setErrorMessage("Please resolve all issues before publishing or saving");
  };

  return (
    <>
      <Prompt message={confirmUnsavedChangesText} when={!completedForm} />
      <DndProvider backend={HTML5Backend}>
        <AssessmentContext.Provider
          value={{
            questions,
            setQuestions,
            showQuestionEditor,
            setShowQuestionEditor,
            editorQuestion,
            setEditorQuestion,
          }}
        >
          {showQuestionEditor ? (
            <QuestionEditor />
          ) : (
            <VStack spacing="8" width="100%">
              <AssessmentEditorHeader
                handleSubmit={handleSubmit}
                isEditing={!!state}
                name={watch("name")}
                onConfirmArchive={onArchiveChanges}
                onConfirmPublish={state ? onPublishChanges : onPublish}
                onDelete={onDeleteTest}
                onError={onError}
                onSave={state ? onSaveChanges : onSave}
                updatedAt={state?.updatedAt}
                validateForm={validateForm}
              />
              <VStack spacing="8" width="92%">
                <BasicInformation
                  clearErrors={clearErrors}
                  control={control}
                  errorMessage={errorMessage}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
                <Divider />
                <AssessmentQuestions />
              </VStack>
            </VStack>
          )}
        </AssessmentContext.Provider>
      </DndProvider>
    </>
  );
};

export default AssessmentEditorPage;
