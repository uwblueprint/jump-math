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
import { FormValidationError } from "../../../utils/GeneralUtils";
import { formatQuestionsRequest } from "../../../utils/QuestionUtils";
import AssessmentEditorHeader from "../../admin/assessment-creation/AssessmentEditorHeader";
import AssessmentPreview from "../../admin/assessment-creation/AssessmentPreview";
import AssessmentQuestions from "../../admin/assessment-creation/AssessmentQuestions";
import BasicInformation from "../../admin/assessment-creation/BasicInformation";
import QuestionEditor from "../../admin/question-creation/QuestionEditor";
import usePageTitle from "../../auth/usePageTitle";
import LoadingState from "../../common/info/LoadingState";
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
  const [showAssessmentPreview, setShowAssessmentPreview] = useState(false);

  const [createTest, { loading: loadingCreate }] = useMutation<{
    createTest: { createTest: { id: string } };
  }>(CREATE_NEW_TEST);

  const [updateTest, { loading: loadingUpdate }] = useMutation<{
    updateTest: { updateTest: { id: string } };
  }>(UPDATE_TEST);

  const [deleteTest, { loading: loadingDelete }] = useMutation<{
    deleteTest: string;
  }>(DELETE_TEST, {
    variables: { id: state?.id },
  });

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

  const assessmentName = state?.name;
  const isExisting = !!state;
  usePageTitle(
    isExisting
      ? assessmentName
        ? `Editing "${assessmentName}"`
        : "Edit Assessment"
      : "Create Assessment",
  );

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
      throw new FormValidationError(noQuestionError);
    }
  };

  const onCreateTest = async (test: TestRequest) => {
    validateForm();
    await createTest({
      variables: {
        test,
      },
    });
    setCompletedForm(true);
    history.push(ASSESSMENTS_PAGE);
  };

  const onUpdateTest = async (test: TestRequest) => {
    validateForm();
    if (!state?.id) {
      throw new FormValidationError("Assessment ID not found");
    }

    await updateTest({
      variables: {
        id: state.id,
        test,
      },
    });

    setCompletedForm(true);
    history.push(ASSESSMENTS_PAGE);
  };

  const onDeleteTest = async () => {
    if (!state?.id) {
      throw new FormValidationError("Assessment ID not found");
    }
    await deleteTest();
    history.push(ASSESSMENTS_PAGE);
  };

  const onSave: SubmitHandler<TestRequest> = (data) =>
    onCreateTest({
      ...data,
      status: Status.DRAFT,
      questions: formatQuestionsRequest(questions),
    });

  const onPublish: SubmitHandler<TestRequest> = (data: TestRequest) =>
    onCreateTest({
      ...data,
      status: Status.PUBLISHED,
      questions: formatQuestionsRequest(questions),
    });

  const onSaveChanges: SubmitHandler<TestRequest> = (data: TestRequest) =>
    onUpdateTest({
      ...data,
      questions: formatQuestionsRequest(questions),
    });

  const onPublishChanges: SubmitHandler<TestRequest> = (data: TestRequest) =>
    onUpdateTest({
      ...data,
      status: Status.PUBLISHED,
      questions: formatQuestionsRequest(questions),
    });

  const onArchiveChanges: SubmitHandler<TestRequest> = (data: TestRequest) =>
    onUpdateTest({
      ...data,
      status: Status.ARCHIVED,
      questions: formatQuestionsRequest(questions),
    });

  const onError = () => {
    setErrorMessage("Please resolve all issues before publishing or saving");
  };

  if (loadingCreate || loadingUpdate || loadingDelete)
    return <LoadingState fullPage />;

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
            showAssessmentPreview,
            setShowAssessmentPreview,
          }}
        >
          {showQuestionEditor && <QuestionEditor />}
          {showAssessmentPreview && <AssessmentPreview />}
          {!showQuestionEditor && !showAssessmentPreview && (
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
