import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Prompt, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Box, Divider, VStack } from "@chakra-ui/react";

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
import * as Routes from "../../../constants/Routes";
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
  const [showAssessmentPreview, setShowAssessmentPreview] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

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

  const isLoading = loadingCreate || loadingUpdate || loadingDelete;

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty: isFormDirty },
    control,
    setValue,
    getValues,
    watch,
    clearErrors,
    reset: resetForm,
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
  const isDirty =
    !shouldRedirect && (isFormDirty || questions !== state?.questions);

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

  const onAfterModify = (options?: { redirect?: boolean }) => {
    // Mark the form as clean after updating.
    resetForm(getValues());
    if (options?.redirect ?? true) {
      console.log("setting");
      setShouldRedirect(true);
    }
  };
  useEffect(() => {
    if (shouldRedirect) {
      history.push(Routes.ASSESSMENTS_PAGE);
    }
  }, [shouldRedirect, history]);

  const onCreateTest = async (test: TestRequest) => {
    validateForm();
    await createTest({
      variables: {
        test,
      },
    });

    // Mark the form as clean after creating.
    onAfterModify({ redirect: true });
  };

  const onUpdateTest = async (
    test: TestRequest,
    options?: { redirect?: boolean },
  ) => {
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

    onAfterModify(options);
  };

  const onDeleteTest = async () => {
    if (!state?.id) {
      throw new FormValidationError("Assessment ID not found");
    }
    await deleteTest();
    onAfterModify({ redirect: true });
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
    onUpdateTest(
      {
        ...data,
        questions: formatQuestionsRequest(questions),
      },
      { redirect: false },
    );

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

  return (
    <>
      <Prompt message={confirmUnsavedChangesText} when={isDirty} />
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
                isEditing={isExisting}
                name={watch("name")}
                onConfirmArchive={onArchiveChanges}
                onConfirmPublish={state ? onPublishChanges : onPublish}
                onDelete={onDeleteTest}
                onError={onError}
                onSave={state ? onSaveChanges : onSave}
                updatedAt={state?.updatedAt}
                validateForm={validateForm}
              />
              <VStack pos="relative" spacing="8" width="92%">
                <Box
                  bg="white"
                  bottom={0}
                  height="100%"
                  left={0}
                  opacity={isLoading ? 0.7 : 0}
                  pointerEvents={isLoading ? "all" : "none"}
                  pos="absolute"
                  right={0}
                  top={0}
                  transition="opacity 0.2s ease-in-out"
                  width="100%"
                  zIndex={1}
                />

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
