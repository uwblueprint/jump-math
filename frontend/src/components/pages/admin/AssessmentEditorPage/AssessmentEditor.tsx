import React, { type ReactElement, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { Prompt, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Box, Divider, VStack } from "@chakra-ui/react";
import type { LocationDescriptorObject } from "history";

import {
  CREATE_NEW_TEST,
  DELETE_TEST,
  UPDATE_TEST,
} from "../../../../APIClients/mutations/TestMutations";
import type {
  Test,
  TestRequest,
  TestResponse,
} from "../../../../APIClients/types/TestClientTypes";
import confirmUnsavedChangesText from "../../../../constants/GeneralConstants";
import * as Routes from "../../../../constants/Routes";
import AssessmentContext from "../../../../contexts/AssessmentContext";
import { Status } from "../../../../types/AssessmentTypes";
import type { Question } from "../../../../types/QuestionTypes";
import { FormValidationError } from "../../../../utils/GeneralUtils";
import {
  formatQuestionsRequest,
  formatQuestionsResponse,
} from "../../../../utils/QuestionUtils";
import AssessmentEditorHeader from "../../../admin/assessment-creation/AssessmentEditorHeader";
import AssessmentPreview from "../../../admin/assessment-creation/AssessmentPreview";
import AssessmentQuestions from "../../../admin/assessment-creation/AssessmentQuestions";
import BasicInformation from "../../../admin/assessment-creation/BasicInformation";
import QuestionEditor from "../../../admin/question-creation/QuestionEditor";
import usePageTitle from "../../../auth/usePageTitle";
import useReloadPrompt from "../../../common/navigation/useReloadPrompt";

type RedirectOptions =
  | (LocationDescriptorObject & { mode: "replace" | "push" })
  | string
  | null;

type AssessmentEditorProps = {
  state?: Test;
};

const AssessmentEditor = ({ state }: AssessmentEditorProps): ReactElement => {
  const history = useHistory();

  const [questions, setQuestions] = useState<Question[]>(
    state?.questions || [],
  );
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [editorQuestion, setEditorQuestion] = useState<Question | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAssessmentPreview, setShowAssessmentPreview] = useState(false);
  const [redirectTo, setRedirectTo] = useState<RedirectOptions>(null);

  const [createTest, { loading: loadingCreate }] = useMutation<{
    createTest: TestResponse;
  }>(CREATE_NEW_TEST);

  const [updateTest, { loading: loadingUpdate }] = useMutation<{
    updateTest: TestResponse;
  }>(UPDATE_TEST);

  const [deleteTest, { loading: loadingDelete }] = useMutation<{
    deleteTest: string;
  }>(DELETE_TEST, {
    variables: { id: state?.id },
  });

  const isLoading = loadingCreate || loadingUpdate || loadingDelete;

  const methods = useForm<TestRequest>();
  const {
    register,
    formState: { errors, isDirty: isFormDirty },
    control,
    setValue,
    watch,
    clearErrors,
    reset: resetForm,
  } = methods;
  useEffect(() => {
    if (state) {
      resetForm({
        name: state.name,
        questions: formatQuestionsRequest(state.questions),
        grade: state.grade,
        assessmentType: state.assessmentType,
        status: state.status,
        curriculumCountry: state.curriculumCountry,
        curriculumRegion: state.curriculumRegion,
      });
      setQuestions(state.questions);
    }
  }, [state, resetForm]);
  const isDirty =
    !redirectTo && (isFormDirty || questions !== state?.questions);

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

  const onUpsertTest = async (
    testRequest: TestRequest,
    options?: { redirect?: boolean },
  ) => {
    validateForm();
    if (state && !state.id) {
      throw new FormValidationError("Assessment ID not found");
    }

    const request = {
      variables: {
        id: state?.id,
        test: testRequest,
      },
    };

    let test;
    if (isExisting) {
      const { data } = await updateTest(request);
      test = data?.updateTest;
    } else {
      const { data } = await createTest(request);
      test = data?.createTest;
    }
    if (!test) {
      throw new Error("Failed to save test");
    }

    // Mark the form as clean after saving.
    if (options?.redirect ?? true) {
      setRedirectTo(Routes.ASSESSMENTS_PAGE);
    } else {
      setRedirectTo({
        mode: "replace",
        pathname: history.location.pathname,
        state: test,
      });
    }
  };

  const onDeleteTest = async () => {
    if (!state?.id) {
      throw new FormValidationError("Assessment ID not found");
    }
    await deleteTest();
    setRedirectTo(Routes.ASSESSMENTS_PAGE);
  };

  const onSave: SubmitHandler<TestRequest> = (data) =>
    onUpsertTest(
      {
        ...data,
        status: Status.DRAFT,
        questions: formatQuestionsRequest(questions),
      },
      { redirect: false },
    );

  const onPublish: SubmitHandler<TestRequest> = (data: TestRequest) =>
    onUpsertTest({
      ...data,
      status: Status.PUBLISHED,
      questions: formatQuestionsRequest(questions),
    });

  const onArchive: SubmitHandler<TestRequest> = (data: TestRequest) =>
    onUpsertTest({
      ...data,
      status: Status.ARCHIVED,
      questions: formatQuestionsRequest(questions),
    });

  useReloadPrompt(isDirty);
  useEffect(() => {
    if (redirectTo) {
      if (typeof redirectTo === "object" && redirectTo.mode === "replace") {
        history.replace(redirectTo);
      } else {
        history.push(redirectTo);
      }
      setRedirectTo(null);
    }
  }, [redirectTo, history]);

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
          <FormProvider {...methods}>
            {showQuestionEditor && <QuestionEditor />}
            {showAssessmentPreview && <AssessmentPreview />}
            {!showQuestionEditor && !showAssessmentPreview && (
              <VStack spacing="8" width="100%">
                <AssessmentEditorHeader
                  isEditing={isExisting}
                  name={watch("name")}
                  onConfirmArchive={onArchive}
                  onConfirmPublish={onPublish}
                  onDelete={onDeleteTest}
                  onError={setErrorMessage}
                  onSave={onSave}
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
          </FormProvider>
        </AssessmentContext.Provider>
      </DndProvider>
    </>
  );
};

export default AssessmentEditor;
